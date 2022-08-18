import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar';
import './products.css'
import { useSelector } from 'react-redux'

import NoItem from '../NoItem'
import { LinearProgress, Stack } from '@mui/material';

function MyProducts() {
  let store = useSelector((state) => { return state })
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const title = store.info.info.nickName;
  let nTitle = null;
  if (title.length > 8) {
    nTitle = title.substr(0, 8) + "...";
  } else {
    nTitle = title
  }

  console.log(store)
  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const result = await axios.get(
        `/api/product/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        }
      );
      if (result.data.length > 0) {
        setData(result.data.reverse());
      }
      setLoading(false)
    }
    fetchData();
  }, []);


  const Loading = () => {
    return (
      < >
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      </>
    );
  };




  const ShowProducts = () => {
    return (
      <>
        {data && data.length > 0 ?
          <>
            {data.map((product) => {
              let mainImg = null;
              if (product.productImg.length > 0) {
                mainImg = 'https://i7c110.p.ssafy.io' + product.productImg[0].path
              }
              let pTitle = null;
              if (product.title.length > 8) {
                pTitle = product.title.substr(0, 8) + "...";
              } else {
                pTitle = product.title
              }

              let price = product.price
              const productPrice = price.toLocaleString('ko-KR');


              return (
                <li className='cards_item' key={product.no}>
                  <div className='card' style={{ height: '250px' }}>
                    <a href={`/product/${product.no}`} >
                      {product.state ?
                        <div style={{ height: '170px' }}>
                          <img className='card_image'
                            src={mainImg}
                            alt={product.title}
                            style={{ opacity: '60%', width: '100%', height: '170px' }}
                          />
                          <h1 style={{ marginTop: '-100px', color: '#6667ab' }}>판매 완료</h1>
                        </div>
                        :
                        <img className='card_image'
                          src={mainImg}
                          alt={product.title}
                          style={{ height: '170px', width: '100%' }}
                        />
                      }
                      <div className='card_content'>
                        <h5 className='card_title'>{pTitle}</h5>
                        <p className='card_text'>{productPrice} 원</p>
                      </div>

                    </a>
                  </div>
                </li>
              );
            })}
          </>
          :
          <NoItem></NoItem>
        }

      </>
    );
  };

  return (
    <>
      <div className='fixnav'>
        <NavBar />
      </div>
      <div className='content'>
        <h1>{nTitle}님의 쏠쏠상점</h1>
        <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowProducts />}
        </ul>
      </div>
    </>
  );
}

export default MyProducts