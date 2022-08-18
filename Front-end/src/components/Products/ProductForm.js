import { useEffect, useState } from "react"
import NavBar from "../NavBar"
import './CreateProduct.css'
import axios from "axios"
import { useParams } from "react-router-dom"

function CreateProduct() {

  const [articlename, setArticleName] = useState('')
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [tagKeyword, setTagKeyword] = useState([])
  const [category, setCategory] = useState('')
  const [detailImgs, setDetailImgs] = useState('')
  const editMode = useParams().id
  const [imgData, setImgData] = useState('')
  const [editimgData, setEditImgData] = useState('')

  useEffect(() => {
    if (editMode) {
      axios({
        url: `/api/product/${editMode}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => {
          console.log(res.data)
          document.getElementsByName('articlename')[0].value = res.data.title
          document.getElementsByName('price')[0].value = String(res.data.price)
          document.getElementsByName('categorys')[0].value = res.data.category
          document.getElementsByName('place')[0].value = res.data.region
          document.getElementsByName('content')[0].value = res.data.content
          setArticleName(res.data.title)
          setPrice(String(res.data.price))
          setPlace(res.data.region)
          setCategory(res.data.category)
          setDescription(res.data.content)

          const updateTag = []
          for (let i=0; i<res.data.tag.length; i++){
            updateTag.push(res.data.tag[i].name)
          }
          setTagKeyword(updateTag)


          const imgs2 = []
          for (let i = 0; i < res.data.productImg.length; i++) {
            imgs2.push(<img className="createproductimg" src={'https://i7c110.p.ssafy.io' + res.data.productImg[i].path} alt="#"></img>)
          }
          console.log(imgs2)
          setEditImgData(imgs2)

        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [editMode])

  function inputForm(e) {
    if (e.target.name === 'articlename') { setArticleName(e.target.value) }
    else if (e.target.name === 'price') {
      setPrice(e.target.value)
      let value = e.target.value;
      value = Number(value.replaceAll(',', ''));
      if (isNaN(value)) {
        e.target.value = 0;
      } else {
        const formatValue = value.toLocaleString('ko-KR');
        e.target.value = formatValue;
      }
    }
    else if (e.target.name === 'content') { setDescription(e.target.value) }
    else if (e.target.name === 'place') { setPlace(e.target.value) }
    else if (e.target.name === 'categorys') { setCategory(e.target.value) }
  }

  function submitProduct(e) {
    e.preventDefault();

    if (category === '') { alert("상품 카테고리를 선택해주세요") }
    else if (articlename === '') { alert("제목을 입력해주세요") }
    else if (price === null) { alert("판매가격을 설정해주세요") }
    else if (editMode === undefined && imgData === '') { alert("이미지를 등록해주세요") }
    else if (description === '') { alert("상세 설명을 적어주세요") }
    else if (place === '') { alert("거래하는 지역을 입력해주세요") }
    else {
      const productData = new FormData()
      console.log(imgData)
      for (let i = 0; i < imgData.length; i++) {
        console.log(imgData[i])
        productData.append('files', imgData[i]);
      }

      let value = price
      value = Number(value.replaceAll(',', ''))

      const jsondata = {
        title: articlename,
        content: description,
        price: value,
        region: place,
        category: category,
        tag: tagKeyword
      }

      console.log(jsondata)
      productData.append("data", new Blob([JSON.stringify(jsondata)], { type: "application/json" }))

      let method = 'post'
      let url = ''
      if (editMode) {
        method = 'patch'
        url = '/' + editMode
      }

      axios({
        url: '/api/product' + url,
        method: method,
        data: productData,
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res.data.no)
          document.location.href = '/product/' + res.data.no
        })
        .catch(err => {
          console.error(err)
        })
    }






  }

  function tagForm(e) {
    e.preventDefault();
    console.log(e.target.value)
    let tagData = e.target.value.replace(/ /g,"")
    console.log(tagData)
    if (e.key === 'Enter' && tagData && tagKeyword.indexOf(tagData) < 0) {
      const tk = [...tagKeyword]
      tk.push(tagData)
      setTagKeyword(tk)
      e.target.value = ''
    }
  }

  function deleteTag(e) {
    const t = [...tagKeyword]
    for (let i = 0; i < t.length; i++) {
      if ('#' + t[i] === e.target.innerText) {
        t.splice(i, 1)
      }
    }
    setTagKeyword(t)
  }

  const handleImageUpload = (e) => {
    setEditImgData(null)
    const fileArr = e.target.files;
    console.log(fileArr)
    setImgData(fileArr)
    let fileURLs = [];
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;
    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setDetailImgs([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const imgs = []
  for (let i = 0; i < detailImgs.length; i++) {
    imgs.push(<img className="createproductimg" src={detailImgs[i]} alt="#"></img>)
  }




  return (
    <div>
      <NavBar></NavBar>
      <div>
        <div className="test">
          <div className="test3">
            {editMode ? 
            <h1 className="my-5 categorytitle">상품 수정</h1>
            :
            <h1 className="my-5 categorytitle">상품 등록</h1>
            }
            
            <form>
              <div>
                <select className="pform" onChange={e => inputForm(e)} name="categorys">
                  <option selected disabled>카테고리</option>
                  <option value={"digital"}>디지털기기</option>
                  <option value={"appliances"}>생활가전</option>
                  <option value={"furniture"}>가구</option>
                  <option value={"fashion"}>패션/잡화</option>
                  <option value={"beauty"}>뷰티/미용</option>
                  <option value={"sports"}>스포츠</option>
                  <option value={"games"}>취미/게임</option>
                  <option value={"book"}>도서</option>
                  <option value={"etc"}>기타</option>
                </select>
              </div>
              <input onChange={e => { inputForm(e) }} className="inputform" name="articlename" type="text" placeholder="글 제목"></input><br />
              <input onChange={e => { inputForm(e) }} className="inputform" name="price" type="text" id="price" placeholder="판매 가격"></input><br />
              <div className="inputform d-flex flex-wrap">
                {editimgData ? editimgData : imgs}
                <input className="file" onChange={handleImageUpload} multiple="multiple" name="productimg[]" id="file" type="file" accept="image/gif, image/jpeg, image/png"></input><br />
              </div>
              <div><label className="uploadlabel" htmlFor="file">사진 업로드</label></div>
              <textarea onChange={e => { inputForm(e) }} className="descriptionform" name="content" placeholder="상품 설명"></textarea><br />
              <input onChange={e => { inputForm(e) }} className="inputform" name="place" type="text" placeholder="지역"></input><br />
              <input onKeyUp={e => { tagForm(e) }} className="inputform" name="relatedtags" type="text" placeholder="검색에 도움되는 키워드를 등록해주세요"></input><br />
              <div className="tagdiv">
                {tagKeyword ? tagKeyword.map((keyword) => {
                  console.log(tagKeyword)
                  return (
                    <label onClick={e => deleteTag(e)} className="tagbox">#{keyword}</label>
                  )
                }) : null}
              </div>
              <button onClick={e => submitProduct(e)} className="inputform submitbutton-able" type="button">{editMode ? "수정하기" : "SUBMIT"}</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreateProduct;