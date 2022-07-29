import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './routers.css'
import NavBar from '../components/NavBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './Carousel.css'
function Product() {

  return (
    <>
      <NavBar></NavBar>
      {/* <div>
        <Carousel style={{ margin: '30px' }} variant="dark">
          <Carousel.Item >
            <img
              className="pro_img d-block w-50 h-50"
              src="https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="pro_img d-block w-50 h-50"
              src="https://cdn.famtimes.co.kr/news/photo/202012/502141_3167_2850.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="pro_img d-block w-50 h-50"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/PhodopusSungorus_2.jpg/640px-PhodopusSungorus_2.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className='user_box'>
          <p className='user_name' style={{ margin: '1em' }}><FontAwesomeIcon icon={faUser} size="2x" style={{ marginRight: '10px' }} />
            닉네임 (본인이 설정한 지역)</p>
          <p className='score'>평점</p>
        </div>
      </div> */}
      <div className='carousel_box'>
        <div className="slider">
          <div className="slides">
            <div id="slide-1"><img className='carousel_img' src="https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg" alt=""></img></div>
            <div id="slide-2"><img className='carousel_img' src="https://cdn.famtimes.co.kr/news/photo/202012/502141_3167_2850.png" alt=""></img></div>
            <div id="slide-3"><img className='carousel_img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/PhodopusSungorus_2.jpg/640px-PhodopusSungorus_2.jpg" alt=""></img></div>
            <div id="slide-4"><img className='carousel_img' src="https://images.mypetlife.co.kr/content/uploads/2021/10/19151330/corgi-g1a1774f95_1280-1024x682.jpg" alt=""></img></div>
          </div>

          <a href="#slide-1">1</a>
          <a href="#slide-2">2</a>
          <a href="#slide-3">3</a>
          <a href="#slide-4">4</a>

        </div>
        {/* 
        <div className='user_box'>
          <p className='user_name' style={{ margin: '1em' }}><FontAwesomeIcon icon={faUser} size="2x" style={{ marginRight: '10px' }} />
            닉네임 (본인이 설정한 지역)</p>
          <p className='score'>평점</p>
        </div> */}
      </div>


    </>
  )
}

export default Product