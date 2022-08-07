import React, { useEffect, useState } from 'react'
import '../routers.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './Carousel.css'
import NavBar from '../../components/NavBar';
import axios from 'axios';
import './products.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import NotFound from '../PageNotFound'

function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const productid = useParams().id;
  const [money,setMoney] = useState('')
  let store = useSelector((state) => { return state })
  let navigate = useNavigate()

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data)
        setLoading(true)
      })
  }, [])
  useEffect(()=>{
    axios({
      url: `/api/product/${productid}`,
      method: 'get',
      })
      .then(res => {
        console.log(res)
        setProductData(res.data)
        let money = res.data.price;
        console.log(money)
        money = Number(String(money).replaceAll(',', ''));
        const formatValue = money.toLocaleString('ko-KR');
        setMoney(formatValue)
      })
      .catch(err => {
        console.error(err)
      })
  },[productid])
  const ShowProducts = () => {
    return (
      <>{
        products.map((product) => {
          let goDetail = '/detail/' + product.id
          return (
            <div key={product.id}>
              <div className='category_reco' >
                <img style={{ cursor: 'pointer' }} onClick={() => {
                  navigate(goDetail)
                }} className='category_img'
                  src={product.image}
                  alt={product.title}
                />
                <div className='category_content'>
                  <h6 className='category_title' style={{ marginTop: '15px', fontSize: '12px' }}>{product.title}</h6>
                  <p className='category_text' style={{ fontSize: '11px' }}>{product.price}</p>
                </div>
              </div>

            </div>
          )
        })
      }</>)
  }

  const Loading = () => {
    return (
      <>
        Loading...
      </>
    );
  };
  console.log(loading)

  function editProduct(e){
    e.preventDefault();
    document.location.href = `/editproduct/${productid}`
  }
  function deleteProduct(e){
    e.preventDefault();
    if (window.confirm("정말 이 상품을 삭제하시겠습니까?")) {
      axios({
        url: `/api/product/${productid}`,
        method: 'delete',
        headers: { Authorization: `Bearer ${localStorage.token}` }
        })
        .then(res => {
          console.log(res)
          alert('삭제되었습니다')
          document.location.href = '/'
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  return (
    <>
      { productData ? 
      <div>
          <NavBar />
          <div className='carousel_box'>
          <div className="slider">
            <div className="slides">
              <div id="slide-1"><img className='carousel_img' src="https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg" alt=""></img></div>
              <div id="slide-2"><img className='carousel_img' src="https://cdn.famtimes.co.kr/news/photo/202012/502141_3167_2850.png" alt=""></img></div>
              <div id="slide-3"><img className='carousel_img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/PhodopusSungorus_2.jpg/640px-PhodopusSungorus_2.jpg" alt=""></img></div>
              <div id="slide-4"><img className='carousel_img' src="https://t1.daumcdn.net/cfile/tistory/994AA8335DBBD34404?original" alt=""></img></div>
            </div>

            {/* <a href="#slide-1"></a>
            <a href="#slide-2"></a>
            <a href="#slide-3"></a>
            <a href="#slide-4"></a> */}
          </div>
        </div>
        <div className='user_box'>
          <div className='user_info'>
            <FontAwesomeIcon icon={faUser} size="2x" style={{ marginRight: '10px', padding: '8px 0 0 8px' }} />
            <p className='user_name' style={{ margin: '1em 1em 1em 0' }}>
              {productData.user.nickname} ({productData.region})</p>
          </div>
          <p className='score'>평점</p>
        </div>

        <div className='product_description'>
          <h3 style={{ margin: '0 10px 20px 10px' }}>{productData.title}</h3>
          <hr></hr>
          <h5 style={{ margin: '0 10px 0 10px' }}>판매가 : {money}원</h5>
          <br></br>
          <p style={{ margin: '0 10px 0 10px' }}>{productData.content}</p>
          <hr></hr>
          <p className='button_box'>
            { store.info.id === productData.user.userid 
            ? <>
            <button className='submitbutton-able' onClick={e=>editProduct(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>수정하기</button>
            <button className='submitbutton-able' onClick={e=>deleteProduct(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>삭제하기</button>
            </>
             
            : <><FontAwesomeIcon icon={faHeart} size="2x" style={{ marginRight: '10px', padding: '0 0 0 8px', color: 'red' }} />
            <button className='submitbutton-able' style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>채팅하기</button>
            <button className='submitbutton-able' style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 10px 0 10px' }}>Live 요청</button></>}
            


          </p>
        </div>
        <hr></hr>
        <h5 style={{ textAlign: "center" }}>카테고리 별 추천 상품</h5>
        <div className='category_reco_box'>
          {loading ? <ShowProducts /> : <Loading />}
        </div>
      </div> : <NotFound />}
      
    </>
  )
}

export default Product