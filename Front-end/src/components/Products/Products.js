import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import './products.css'

import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import LikeButton from './LikeButton';
import LiveButton from './LiveButton';
import NoItem from '../NoItem'
import { LinearProgress, Stack } from '@mui/material';

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const location = useLocation().state.category;

  const url = window.location.href;


  const Title = () => {
    if (location === 'digital') {
      setTitle('디지털기기')
    } else if (location === 'appliances') {
      setTitle('생활가전')
    } else if (location === 'furniture') {
      setTitle('가구')
    } else if (location === 'fashion') {
      setTitle('패션/잡화')
    } else if (location === 'beauty') {
      setTitle('뷰티/미용')
    } else if (location === 'sports') {
      setTitle('스포츠')
    } else if (location === 'games') {
      setTitle('취미/게임')
    } else if (location === 'book') {
      setTitle('도서')
    } else {
      setTitle('기타')
    }
  }


  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const result = await axios.get(
        `/api/product`
      );
      setData(result.data.reverse());
      setLoading(false)
      let updatedList = null;
      if (result.data && result.data.length > 0) {
        updatedList = result.data.filter((x) => x.category === location)
      }
      setFilter(updatedList);
    }
    fetchData();
    Title();

  }, [location]);


  const Loading = () => {
    return (
      <>
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      </>
    );
  };




  const ShowProducts = () => {
    return (
      <>
        {filter && filter.length > 0 ?
          <>
            {filter.map((product) => {
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
                  <div className='card'>
                    <a href={`/product/${product.no}`}>
                      {product.state ?
                        <div style={{ height: '170px' }}>
                          <img className='card_image'
                            src={mainImg}
                            alt={product.title}
                            style={{ opacity: '70%', width: '100%', height: '170px' }}
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
                    <CardActions disableSpacing sx={{ justifyContent: 'space-around', marginTop: "-10px" }}  >
                      <LikeButton no={product.no} />
                      <LiveButton no={product.no} />
                      <IconButton aria-label="share" onClick={function () { alert('링크가 복사되었습니다.') }} >
                        <CopyToClipboard text={url + `/` + product.no}>
                          <ShareIcon />
                        </CopyToClipboard>
                      </IconButton>
                    </CardActions>
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
        <h1>{title}</h1>
        <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowProducts />}
        </ul>
      </div>
    </>
  );
}

export default Products