import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import './CreateProduct.css'
import axios from "axios"
import { useParams } from "react-router-dom"

function CreateProduct() {

  const [articlename, setArticleName] = useState('')
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [taglist, setTagList] = useState([])
  const [category, setCategory] = useState('')
  const [detailImgs, setDetailImgs] = useState('')
  const editMode = useParams().id

  useEffect(() => {
    if (editMode) {
    axios({
      url: `/api/product/${editMode}`,
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.token}` }
      })
      .then(res => {
        console.log(res)
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

      })
      .catch(err => {
        console.error(err)
      })
  }
  },[editMode])
  


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

    let method = 'post'
    let url = ''
    if (editMode) {
      method = 'patch'
      url = '/'+editMode
    }

    console.log(category, articlename, price, description, place)
    if (category === '') { alert("상품 카테고리를 선택해주세요") }
    else if (articlename === '') { alert("제목을 입력해주세요") }
    else if (price === null) { alert("판매가격을 설정해주세요") }
    else if (description === '') { alert("상세 설명을 적어주세요") }
    else if (place === '') { alert("거래하는 지역을 입력해주세요") }
    else {
      let value = price
      value = Number(value.replaceAll(',', ''))
      const data = { title:articlename, content:description, price:value, region:place, category:category}
      axios({
        url: '/api/product/'+ url,
        method: method,
        data: data,
        headers: { Authorization: `Bearer ${localStorage.token}` }
        })
        .then(res => {
          console.log(res.data.no)
          document.location.href = '/product/'+res.data.no
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  function tagForm(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      const t = [...taglist]
      t.push(<label className="tagbox">#{e.target.value}</label>)
      setTagList(t)
      e.target.value = ''
    }
  }

  const handleImageUpload = (e) => {
    const fileArr = e.target.files;
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

  // if (imgs.length === 0 ) {
  //   console.log(document.getElementById('file'))   //이미지 안올렸을때 빈박스 안보이는거 시도
  // }

  return (
    <div>
      <NavBar></NavBar>
      <div>
        <div className="test">
          <div className="test3">
            <h1 className="my-5">CREATE ROOM</h1>
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
              <div className="inputform d-flex flex-wrap">{imgs}
                <input className="file" onChange={handleImageUpload} multiple="multiple" name="productimg[]" id="file" type="file" accept="image/gif, image/jpeg, image/png"></input><br />
              </div>
              <div><label className="uploadlabel" htmlFor="file">사진 업로드</label></div>
              <textarea onChange={e => { inputForm(e) }} className="descriptionform" name="content" placeholder="상품 설명"></textarea><br />
              <input onChange={e => { inputForm(e) }} className="inputform" name="place" type="text" placeholder="지역"></input><br />
              <input onKeyUp={e => { tagForm(e) }} className="inputform" name="relatedtags" type="text" placeholder="관련 태그"></input><br />
              <div className="tagdiv">{taglist}</div>
              <button onClick={e => submitProduct(e)} className="inputform submitbutton-able" type="button">{ editMode ? "수정하기" : "SUBMIT"}</button>
            </form>
          </div>
        </div>
      </div> 
      
    </div>
  )
}

export default CreateProduct;