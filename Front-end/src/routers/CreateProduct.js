import { useState } from "react"
import NavBar from "../components/NavBar"
import './CreateProduct.css'

function CreateProduct() {

  const [articlename, setArticleName] = useState('')
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState('')
  const [place, setPlace] = useState('')
  const [taglist, setTagList] = useState([])
  const [category, setCategory] = useState('')
  const [detailImgs, setDetailImgs] = useState('')


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
    else if (e.target.name === 'description') { setDescription(e.target.value) }
    else if (e.target.name === 'place') { setPlace(e.target.value) }
    else if (e.target.name === 'categorys') { setCategory(e.target.value) }
  }

  function submitProduct(e) {
    e.preventDefault();
    console.log(category, articlename, price, description, place)
    if (category === '') { alert("상품 카테고리를 선택해주세요") }
    else if (articlename === '') { alert("제목을 입력해주세요") }
    else if (price === null) { alert("판매가격을 설정해주세요") }
    else if (description === '') { alert("상세 설명을 적어주세요") }
    else if (place === '') { alert("거래하는 지역을 입력해주세요") }
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
  if (imgs.length === 0 ) {
    console.log(document.getElementById('file'))   //이미지 안올렸을때 빈박스 안보이는거 시도
  }

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
                  <option value="전자기기">전자기기</option>
                  <option value="신발">신발</option>
                  <option value="옷">옷</option>
                  <option value="악세서리">악세서리</option>
                </select>
              </div>
              <input onChange={e => { inputForm(e) }} className="inputform" name="articlename" type="text" placeholder="글 제목"></input><br />
              <input onChange={e => { inputForm(e) }} className="inputform" name="price" type="text" id="price" placeholder="판매 가격"></input><br />
              <div className="inputform d-flex flex-wrap">{imgs}
                <input className="file" onChange={handleImageUpload} multiple="multiple" name="productimg[]" id="file" type="file" accept="image/gif, image/jpeg, image/png"></input><br />
              </div>
              <div><label className="uploadlabel" htmlFor="file">사진 업로드</label></div>
              <textarea onChange={e => { inputForm(e) }} className="descriptionform" name="description" placeholder="상품 설명"></textarea><br />
              <input onChange={e => { inputForm(e) }} className="inputform" name="place" type="text" placeholder="지역"></input><br />
              <input onKeyUp={e => { tagForm(e) }} className="inputform" name="relatedtags" type="text" placeholder="관련 태그"></input><br />
              <div className="tagdiv">{taglist}</div>
              <button onClick={e => submitProduct(e)} className="inputform submitbutton-able" type="button">SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct;