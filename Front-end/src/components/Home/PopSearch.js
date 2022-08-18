import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css/pagination";


import SwiperCore, { Autoplay } from "swiper";

function PopSearch() {
    SwiperCore.use([Autoplay]);

    const [pops, setPops] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(
                `/api/pop`
            );
            setPops(result.data.slice(0, 5))
        }
        fetchData();
    }, []);


    return (
        <div className='d-flex justify-content-center'>
        
        <div className='Popularsearch'>
            <div className=''>
                <h6 className='PopularsearchTitle' style={{ textAlign: 'center', fontFamily: 'Pretendard',fontWeight:'bold' }}>쏠쏠러들이 찾고있는 검색어</h6>
                <>
                    <Swiper
                        direction={"vertical"}
                        className="mySwiper"
                        autoplay={{ delay: 1500 }}
                        height={35}
                        slidesPerView={1}
                        spaceBetween={30}
                        style={{ height: 55 }}
                    >
                        {pops.length > 0 ?
                            <>
                                {pops.map((pop) => {
                                    return (
                                        <SwiperSlide key={pop.popId} >
                                            <div>
                                                <a href={`/search/${pop.title}`} style={{ textDecoration: 'none', textAlign: 'center' }}><h1 style={{ color: '#6667AB', fontSize: 50 }}>{pop.title}</h1></a>
                                            </div>
                                        </SwiperSlide>
                                    );

                                })}
                            </>
                            : null}
                    </Swiper>
                </>



            </div>
            <div style={{marginBottom: 100}}></div>
        </div>
        </div>
    )
}

export default PopSearch