import React, { useEffect, useState } from 'react'
import '../routers.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './Carousel.css'
import NavBar from '../../components/NavBar';
import axios from 'axios';
import './products.css'

function Product() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data)
        // console.log(res.data)
        // console.log(products)
        setLoading(true)
      })

  }, [])

  const ShowProducts = () => {
    return (
      <>{
        products.map((product) => {
          console.log(product)
          return (
            <>
              <div className='category_reco' key={product.id}>
                <img className='category_img'
                  src={product.image}
                  alt={product.title}
                />
                <div className='category_content'>
                  <h6 className='category_title' style={{ marginTop: '15px' }}>{product.title}</h6>
                  <p className='category_text'>{product.price}</p>
                </div>
              </div>

            </>
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
  return (
    <>
      <NavBar />

      <div className='carousel_box'>
        <div className="slider">
          <div className="slides">
            <div id="slide-1"><img className='carousel_img' src="https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg" alt=""></img></div>
            <div id="slide-2"><img className='carousel_img' src="https://cdn.famtimes.co.kr/news/photo/202012/502141_3167_2850.png" alt=""></img></div>
            <div id="slide-3"><img className='carousel_img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/PhodopusSungorus_2.jpg/640px-PhodopusSungorus_2.jpg" alt=""></img></div>
            <div id="slide-4"><img className='carousel_img' src="https://t1.daumcdn.net/cfile/tistory/994AA8335DBBD34404?original" alt=""></img></div>
          </div>

          <a href="#slide-1"></a>
          <a href="#slide-2"></a>
          <a href="#slide-3"></a>
          <a href="#slide-4"></a>
        </div>
      </div>
      <div className='user_box'>
        <div className='user_info'>
          <FontAwesomeIcon icon={faUser} size="2x" style={{ marginRight: '10px', padding: '8px 0 0 8px' }} />
          <p className='user_name' style={{ margin: '1em 1em 1em 0' }}>
            닉네임 (본인이 설정한 지역)</p>
        </div>
        <p className='score'>평점</p>
      </div>
      <hr></hr>
      <h5 style={{ textAlign: "center" }}>카테고리 별 추천 상품</h5>
      <div className='category_reco_box'>
        {loading ? <ShowProducts /> : <Loading />}
      </div>
    </>
  )
}

export default Product