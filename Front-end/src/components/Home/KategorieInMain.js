import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Pagination, Autoplay } from "swiper";

import "swiper/css/pagination";

function KategorieInMain() {
  const [newdata, setNewData] = useState([]);
  const [hotdata, setHotData] = useState([]);
  const [loading, setLoading] = useState(false);
  SwiperCore.use([Pagination, Autoplay]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `/api/product`
      );
      // console.log(result)
      setNewData(result.data.reverse().slice(0, 10));

      setHotData( result.data.sort(function(a, b){
        return b.viewCount - a.viewCount
      }).slice(0, 10))
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
    return (
      <>
        <Swiper spaceBetween={-15}
          // scrollbar={{ draggable: true }}
          height={200}
          breakpoints={{
            1200: {
              slidesPerView: 6,
            },
            991: {
              slidesPerView: 4,
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
                const mainImg = 'https://i7c110.p.ssafy.io' + product.productImg[0].path
                let pTitle = null;
                if (product.title.length > 8) {
                  pTitle = product.title.substr(0, 8) + "...";
                } else {
                  pTitle = product.title
                }

                let price = product.price
                const productPrice = price.toLocaleString('ko-KR');

                return (
                  <SwiperSlide className='cards_item' key={product.no}>
                    <a href={`/product/${product.no}`} className='card' style={{ height: 250 }}>
                      <img className='card_image'
                        src={mainImg}
                        alt={product.title}
                      />
                      <div className='card_content'>
                        <h5 className='card_title'>{pTitle}</h5>
                        <p className='card_text'>{productPrice} 원</p>
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

  return (
    <>
      <div className="content">
        <div className='hometext'><h4>NEW ARRIVAL</h4></div>
        <ul className='cards' id='maincontent' style={{marginTop:'-10px'}}>
          {loading ? <Loading /> : <ShowMainItem data={newdata} />}
        </ul>
      </div>
      <div className="content">
        <div className='hometext'><h4>HOT ITEMS</h4></div>
        <ul className='cards' id='maincontent' style={{marginTop:'-10px'}}>
          {loading ? <Loading /> : <ShowMainItem data={hotdata} />}
        </ul>
      </div>
    </>
  )
}

export default KategorieInMain;