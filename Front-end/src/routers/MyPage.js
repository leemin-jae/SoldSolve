import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Modal from '../components/Modals/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faReceipt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './routers.css';
import { useSelector, useDispatch } from 'react-redux'

import { getInfo } from '../store.js'

import '../components/Products/products.css';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';




function MyPage() {

  let store = useSelector((state) => { return state })
  let dispatch = useDispatch()

  const [wish, setWish] = useState([]);
  const [sell, setSell] = useState([]);
  const [buy, setBuy] = useState([]);


  useEffect(() => {
    profileUpdate()
    async function wishData() {
      const result = await axios.get(
        `/api/wishes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        }
      );
      setWish(result.data);
    }
    async function sellData() {
      const result = await axios.get(
        `/api/product/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        }
      );
      setSell(result.data);
    }
    async function buyData() {
      const result = await axios.get(
        `/api/deal/buy`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        }
      );
      setBuy(result.data);
    }
    wishData();
    sellData();
    buyData();
    console.log(wish)

  }, []);

  const profile = store.info.info
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);

  const openBuyModal = () => {
    setBuyModalOpen(true);
  };
  const closeBuyModal = () => {
    setBuyModalOpen(false);
  };

  const openSellModal = () => {
    setSellModalOpen(true);
  };
  const closeSellModal = () => {
    setSellModalOpen(false);
  };


  function profileUpdate() {
    axios({
      url: '/api/users/me',
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      }
    })
      .then(res => {
        dispatch(getInfo(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }

  function WishBox(props) {
    console.log(props.props)
    
  
    return (
      <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={200}>
        {props.props.map((item) => {


           let price = item.product.price
           const productPrice = price.toLocaleString('ko-KR');
       
      
          return (
          <a href={`/product/${item.product.no}`}>
            <ImageListItem key={item.product.no}>
              <img
                src={`https://i7c110.p.ssafy.io${item.product.productImg[0].path}`}
                srcSet={`${item.product.productImg[0]}`}
                alt={item.product.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.product.title}
                subtitle={productPrice}
              />
            </ImageListItem>
          </a>
        )})}
      </ImageList>
    );
  }
  console.log(sell)
  console.log(buy)

  function SellBox(props) {
    console.log(props.props)
    return (
      <ImageList sx={{ width: 280, height: 400 }} cols={2} rowHeight={150}>
        {props.props.map((item) => {


           let price = item.price
           const productPrice = price.toLocaleString('ko-KR');
       
      
          return (
          <a href={`/product/${item.no}`}>
            <ImageListItem key={item.no}>
              <img
                src={`https://i7c110.p.ssafy.io${item.productImg[0].path}`}
                srcSet={`${item.productImg[0]}`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={productPrice}
              />
            </ImageListItem>
          </a>
        )})}
      </ImageList>
    );
  }

  function BuyBox(props) {
    console.log(props.props)
    return (
      <ImageList sx={{ width: 280, height: 400 }} cols={2} rowHeight={150}>
        {props.props.map((item) => {


           let price = item.product.price
           const productPrice = price.toLocaleString('ko-KR');
       
      
          return (
          <a href={`/product/${item.product.no}`}>
            <ImageListItem key={item.product.no}>
              <img
                src={`https://i7c110.p.ssafy.io${item.product.productImg[0].path}`}
                srcSet={`${item.product.productImg[0]}`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.product.title}
                subtitle={productPrice}
              />
            </ImageListItem>
          </a>
        )})}
      </ImageList>
    );
  }


  function imgupdate(e) {
    e.preventDefault();
    const imgdata = new FormData();
    imgdata.append('files', e.target.files[0]);
    axios({
      url: '/api/users/update/profile',
      method: 'post',
      data: imgdata,
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {
        console.log(res)
        profileUpdate()
      })
      .catch(err => {
        console.error(err)
      })
  }

  function ProfileCard() {

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"

      >
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {profile.nickName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                <a href='/editaccount'><ManageAccountsIcon color="secondary" /></a>
                <input type="file" accept='image/*' onChange={e => imgupdate(e)} id="imgChange" hidden={true}></input>
                <label htmlFor="imgChange"><PhotoCameraIcon /></label>
                <div><a href='/#'>내상품관리</a></div>
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={'https://i7c110.p.ssafy.io' + profile.profileUrl}
            alt="Live from space album cover"
          />
        </Card>
      </Box>
    );
  }

  return (
    <>
      <NavBar />
      <div className='mypage' style={{ margin: 50 }}>
        <h3 style={{ margin: 50 }}>MY PAGE</h3>
        <ProfileCard className='account_container' />
        <div className='history_container'>
          <div className='column'>
            <button className='dot' onClick={openBuyModal}>
              <FontAwesomeIcon className='icon' icon={faCartArrowDown} size="2x" />
              <div>구매내역</div>
            </button>
            <Modal open={buyModalOpen} close={closeBuyModal} header="구매내역">
            <BuyBox props={buy} />
            </Modal>
          </div>
          <div className='column'>
            <button className='dot' onClick={openSellModal}>
              <FontAwesomeIcon className='icon' icon={faReceipt} size="2x" />
              <div>판매내역</div>
            </button>
            <Modal open={sellModalOpen} close={closeSellModal} header="판매내역">
            <SellBox props={sell} />
            </Modal>
          </div>
        </div>
        <hr />
        <div className='heart_container'>
          <div className='column'>
            찜한상품
          </div>
        </div>
        <br />
        <div className='hearts'>
          <WishBox props={wish} />
        </div>
        <hr />
      </div>
    </>
  )
}



export default MyPage