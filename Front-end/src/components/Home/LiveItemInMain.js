import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Pagination, Autoplay } from "swiper";

import "swiper/css/pagination";

function LiveItemInMain() {
  const [LiveList, setLiveList] = useState([]);
  const [loading, setLoading] = useState(false);
  SwiperCore.use([Pagination, Autoplay]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `/api/live/list`
      );
      setLiveList(result.data)
      setLoading(false)
    }
    fetchData();
  }, []);

  const Loading = () => {
    return (
      <>
        Loading...
      </>
    );
  };

  const ShowMainItem = (data) => {
    console.log(data.data)
    return (
      <>
        <Swiper spaceBetween={-100}
          // scrollbar={{ draggable: true }}
          // height={1000}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 3,
            },
            300: {
              slidesPerView: 2,
            }
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay:3000 }}
        >
          {data.data.length > 0 ?
            <>
              {data.data.map((product) => {
                console.log(product)
                const mainImg = 'https://i7c110.p.ssafy.io' + product.product.productImg[0].path
                let pTitle = null;
                if (product.title.length > 8) {
                  pTitle = product.title.substr(0, 8) + "...";
                } else {
                  pTitle = product.title
                }

                let pName = null;
                if (product.product.user.nickname.length > 6) {
                  pName = product.product.user.nickname.substr(0, 6) + "...";
                } else {
                  pName = product.product.user.nickname
                }

                let price = product.product.price
                const productPrice = price.toLocaleString('ko-KR');

                return (
                  <SwiperSlide className='cards_item' key={product.id}>
                    <a href={`/live/${product.product.user.userid}/${product.sessionId}`} className='card' style={{ height: 300 }}>
                      <img className='card_image'
                        src={mainImg}
                        alt={product.title}
                        style={{ height: 250 }}
                      />
                      <div className='card_content'>
                        <h5 className='card_title'>{pTitle}</h5>
                        <p className='card_text'>{productPrice} 원</p>
                        <h6>{pName}님이 라이브중입니다</h6>
                      </div>
                    </a>
                  </SwiperSlide>
                );
              })}
            </>
            : null}
        </Swiper>
      </>
    );
  };



  console.log(LiveList)
  return (
    <div className="content">
      <div className='hometext'><h4>NOW LIVE</h4></div>
      {loading ? <Loading /> : <ShowMainItem data={LiveList} />}
      <ul className='cards' id='maincontent'>
      </ul>
    </div>
  )
}

export default LiveItemInMain;