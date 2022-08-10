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

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const location = useLocation().state.category;

  const url = window.location.href;

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const result = await axios.get(
        `/api/product`
      );
      setData(result.data);
      setLoading(false)
      let updatedList=null;
      if (result.data && result.data.length > 0){
        updatedList = result.data.filter((x) => x.category === location)
      }
      setFilter(updatedList);
    }
    fetchData();

  }, [location]);


  const Loading = () => {
    return (
      <>
        Loading...
      </>
    );
  };


  const ShowProducts = () => {
    return (
      <>
        { filter && filter.length > 0 ?
        <>
        {filter.map((product) => {
          let mainImg = null;
          if (product.productImg.length>0) {
            mainImg = 'https://i7c110.p.ssafy.io'+product.productImg[0].path
          }
          return (
            <li className='cards_item' key={product.no}>
              <div className='card'>
                <a href={`/product/${product.no}`}>
                  <img className='card_image'
                    src={mainImg}
                    alt={product.title}
                  />
                  <div className='card_content'>
                    <h5 className='card_title'>{product.title}</h5>
                    <p className='card_text'>{product.price}</p>
                  </div>

                </a>
                <CardActions disableSpacing sx={{ justifyContent: 'space-around' }}  >
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
      <NavBar />
      <div className='content'>
        <h1>{location}</h1>
        <ul className='cards' id='maincontent'>
          {loading ? <Loading /> : <ShowProducts />}
        </ul>
      </div>
    </>
  );
}

export default Products