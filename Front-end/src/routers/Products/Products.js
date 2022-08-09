import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import './products.css'

import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import { CopyToClipboard } from 'react-copy-to-clipboard'


function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const location = useLocation().state.category;

  const [wishlist, setWishlist] = useState([]);
  const [wish, setWish] = useState([]);

  const url = window.location.href;

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const result = await axios.get(
        `/api/product`
      );
      setData(result.data);
      setLoading(false)
      const updatedList = result.data.filter((x) => x.category === location)
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



  const ChangeLike = (noprops) => {
    console.log(noprops)
    const [like, setLike] = useState(false)
    async function likeData(noprops) {
      const res = await axios.get(
        `/api/wishes/check/` + noprops, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }
      )
      console.log(res.data)
      if (res.data === true) {
        setLike(true)
      }
    }
    likeData(noprops)
    console.log(noprops, like)

    
    if (like === true){
      axios({
        url:  `/api/wishes`,
        method: 'delete',
        params: { product: noprops },
        headers : { Authorization: `Bearer ${localStorage.token}` }
      })

      .then(res => {
        console.log("삭제 성공")
        setLike(false)
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      axios({
        url:  `/api/wishes`,
        method: 'post',
        params: { product: noprops },
        headers : { Authorization: `Bearer ${localStorage.token}` }
      })

      .then(res => {
        console.log("추가 성공")
        setLike(true)
      })
      .catch(err => {
        console.log(err)
      })
    }  
    console.log('change', like)
  }

  const LikeButton = (no) => {
    const [like, setLike] = useState(false)


      async function likeData(no) {
        const res = await axios.get(
          `/api/wishes/check/` + no.no, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        }
        )
        console.log(res.data)
        if (res.data === true) {
          setLike(true)
        }
      }
      likeData(no)


    return (
      <>
        {like ?
        <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
          :
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
            </IconButton>
        }
      </>
    )
  }




  const ShowProducts = () => {
    return (
      <>
        {filter.map((product) => {
          return (
            <li className='cards_item' key={product.no}>
              <div className='card'>
                <a href={`/product/${product.no}`}>
                  <img className='card_image'
                    src={product.image}
                    alt={product.title}
                  />
                  <div className='card_content'>
                    <h5 className='card_title'>{product.title}</h5>
                    <p className='card_text'>{product.price}</p>
                  </div>

                </a>
                <CardActions disableSpacing sx={{ justifyContent: 'space-around' }}  >
                  <LikeButton no={product.no}/>
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