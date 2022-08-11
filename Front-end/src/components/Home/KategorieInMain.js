import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Pagination } from "swiper";

import "swiper/css/pagination";

function KategorieInMain() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  SwiperCore.use([Pagination]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `/api/product`
      );
      console.log(result)
      setData(result.data.slice(0, 10));
      setLoading(false)
    }
    fetchData();
    console.log(data)
  }, []);


  const Loading = () => {
    return (
      <>
        Loading...
      </>
    );
  };


  const ShowNew = () => {
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
          >
          {data.length > 0 ? 
            <>
            {data.map((product) => {
              const mainImg = 'https://i7c110.p.ssafy.io'+product.productImg[0].path
              return (
                <SwiperSlide className='cards_item' key={product.no}>
                  <a href={`/product/${product.no}`} className='card' style={{height: 250}}>
                    <img className='card_image'
                      src={mainImg}
                      alt={product.title}
                    />
                    <div className='card_content'>
                      <h5 className='card_title'>{product.title}</h5>
                      <p className='card_text'>{product.price} 원</p>
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
        <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowNew />}
        </ul>
      </div>
      <div className="content">
        <div className='hometext'><h4>HOT ITEMS</h4></div>
        <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowNew />}
        </ul>
      </div>
    </>
  )
}

export default KategorieInMain;