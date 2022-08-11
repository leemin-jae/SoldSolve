import React, { useEffect, useState } from 'react'
import '../../routers/routers.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './Carousel.css'
import NavBar from '../../components/NavBar';
import axios from 'axios';
import './products.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import NotFound from '../../routers/PageNotFound'
import LikeButton from './LikeButton';
import LiveButton from './LiveButton';

import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const productid = useParams().id;
  const [money, setMoney] = useState('')
  const [userId, setUserId] = useState('')
  let store = useSelector((state) => { return state })
  let navigate = useNavigate()

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data)
        setLoading(true)
      })
  }, [])
  useEffect(() => {
    axios({
      url: `/api/product/${productid}`,
      method: 'get',
    })
      .then(res => {
        console.log(res)
        setProductData(res.data)
        setUserId(res.data.user.userid)
        let money = res.data.price;
        console.log(money)
        money = Number(String(money).replaceAll(',', ''));
        const formatValue = money.toLocaleString('ko-KR');
        setMoney(formatValue)
      })
      .catch(err => {
        console.error(err)
      })
  }, [productid])

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

  function editProduct(e) {
    e.preventDefault();
    document.location.href = `/editproduct/${productid}`
  }
  function deleteProduct(e) {
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
  function createLive(e) {
    e.preventDefault();
    document.location.href = `/createroom/${productid}`
  }
  function goLive(e) {
    e.preventDefault();
    console.log(productData.user.userid)
    document.location.href = `/live/${productData.user.userid}/sell${productid}`
  }

  const createRoom = () => {
    if (window.confirm("판매자와 연락하시겠습니까?")) {
      axios({
        url: '/api/room',
        method: 'post',
        params: { seller: userId },
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res.data, '방생성')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  const imglist = []
  if (productData && productData.productImg.length > 0) {
    console.log(1234)
    for (let i = 0; i < productData.productImg.length; i++) {
      console.log(productData.productImg[i].path)
      imglist.push(<div id="slide-1"><img className='carousel_img' src={'https://i7c110.p.ssafy.io' + productData.productImg[i].path} alt=""></img></div>)
    }
  }

  return (
    <>
      {productData ?
        <div>
          <div className='fixnav'>
          <NavBar />
          </div>
          <div className='carousel_box'>
            <div className="slider">
              <div className="slides">
                {imglist}
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
            {localStorage.token ? (
              <div className='button_box'>
                {store.info.info.userId === productData.user.userid
                  ?
                  <>
                    <button className='submitbutton-able' onClick={e => createLive(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브방</button>
                    <div>
                      <button className='submitbutton-able' onClick={e => editProduct(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>수정하기</button>
                      <button className='submitbutton-able' onClick={e => deleteProduct(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>삭제하기</button>
                    </div>

                  </>

                  :
                  <>
                    <button className='submitbutton-able' onClick={e => goLive(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브방</button>
                    <div>
                      {/* <FontAwesomeIcon icon={faHeart} size="2x" style={{ marginRight: '10px', padding: '0 0 0 8px', color: 'red' }} /> */}
                      <LikeButton no={productData.no} />
                      {/* <button className='submitbutton-able' style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }} onClick={createRoom}>채팅하기</button> */}
                      <IconButton aria-label="add to favorites" onClick={createRoom}>
                        <ChatIcon />
                      </IconButton>
                      <LiveButton no={productData.no} />
                    </div>
                  </>
                }



              </div>
            ) : null}
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