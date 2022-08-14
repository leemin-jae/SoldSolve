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
      <div style={{textAlign:'center', marginTop:'2em'}}>
        <h5>진행중인 라이브가 없습니다</h5>
        <h6>판매중인 상품에</h6>
          <h6>실시간 소통을 더해보세요</h6>
      </div>
    );
  };

  const ShowMainItem = (data) => {
    console.log(data.data)
    return (
      <>
        <Swiper spaceBetween={-50}
          // scrollbar={{ draggable: true }}
          // height={1000}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            300: {
              slidesPerView: 1,
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
                    <a href={`/live/${product.product.user.userid}/${product.sessionId}`} className='card' style={{ height: 300 }} >
                      <img className='card_image'
                        src={mainImg}
                        alt={product.title}
// <<<<<<< HEAD
                        style={{ minHeight: 200 }}
// =======
//                         style={{ height: 190 }}
// >>>>>>> 50f36b241503b821f4bf18f58f2796b3def88703
                      />
                      <div className='card_content'>
                        <h5 className='card_title'>{pTitle}</h5>
                        <p className='card_text'>{productPrice} 원</p>
                        <h6 className='flicker'>{pName}님이 라이브중입니다</h6>
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
      {LiveList.length ? <ShowMainItem data={LiveList} /> : <Loading />}
    </div>
  )
}

export default LiveItemInMain;