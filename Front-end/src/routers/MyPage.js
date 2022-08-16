import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getInfo } from '../store.js'
import NavBar from '../components/NavBar'
import Modal from '../components/Modals/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faReceipt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './routers.css';
import './MyPage.css'
import '../components/Products/products.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import StorefrontIcon from '@mui/icons-material/Storefront';
import NoItem from '../components/NoItem';
import SettingsIcon from '@mui/icons-material/Settings';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';




function MyPage() {

  let store = useSelector((state) => { return state })
  let dispatch = useDispatch()

  const [wish, setWish] = useState([]);
  const [sell, setSell] = useState([]);
  const [buy, setBuy] = useState([]);

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log(eventKey),
    );

    return (
      <SettingsIcon onClick={decoratedOnClick} style={{ position: 'absolute', left: 120, top: 2 }}></SettingsIcon>
    );
  }

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


  console.log(sell)
  console.log(buy)

  function SellBox(props) {
    console.log(props.props)
    return (
      <ImageList sx={{ width: 280, height: 400, justifyContent: 'space-between', margin: 'auto' }} cols={2} rowHeight={150}>
        {props.props.map((item) => {


          let price = item.price
          const productPrice = price.toLocaleString('ko-KR');


          return (
            <a href={`/product/${item.no}`} style={{ width: '125px', textAlign: 'center' }}>
              <ImageListItem key={item.no}>
                <img
                  src={`https://i7c110.p.ssafy.io${item.productImg[0].path}`}
                  srcSet={`${item.productImg[0]}`}
                  alt={item.title}
                  loading="lazy"
                  style={{ height: '150px', objectFit: 'fill' }}
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={productPrice}
                />
              </ImageListItem>
            </a>
          )
        })}
      </ImageList>
    );
  }

  function BuyBox(props) {
    console.log(props.props)
    return (
      <ImageList sx={{ width: 280, height: 400, justifyContent: 'space-between', margin: 'auto' }} cols={2} rowHeight={150}>
        {props.props.map((item) => {


          let price = item.product.price
          const productPrice = price.toLocaleString('ko-KR');


          return (
            <a href={`/product/${item.product.no}`} style={{ width: '125px', textAlign: 'center' }}>
              <ImageListItem key={item.product.no}>
                <img
                  src={`https://i7c110.p.ssafy.io${item.product.productImg[0].path}`}
                  srcSet={`${item.product.productImg[0]}`}
                  alt={item.title}
                  loading="lazy"
                  style={{ height: '150px', objectFit: 'fill' }}
                />
                <ImageListItemBar
                  title={item.product.title}
                  subtitle={productPrice}
                />
              </ImageListItem>
            </a>
          )
        })}
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
      <>
        <div className="profileImgBox">
          <img className="profile" src={'https://i7c110.p.ssafy.io' + profile.profileUrl} />
        </div>
        <Accordion eventKey="0">
          <h3 style={{ margin: 15, position: 'relative', display: 'inline-block' }}>
            {profile.nickName}
            <CustomToggle eventKey="0" />
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ position: 'absolute', left: 86, zIndex: 99, top: 26, margin: 0, padding: 0, opacity: '100%' }}>
                <div className='setting_list'>
                  <a href='/editaccount' style={{ margin: '5px', color: 'black' }}><ManageAccountsIcon /></a>
                  <input type="file" accept='image/*' onChange={e => imgupdate(e)} id="imgChange" hidden={true}></input>
                  <label htmlFor="imgChange"><PhotoCameraIcon style={{}} /></label>
                  <a style={{ textDecoration: 'none', margin: '5px', color: 'black' }} href='/mypage/products'><StorefrontIcon /></a>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </h3>
        </Accordion>
      </>
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
              {buy ? <BuyBox props={buy} /> : <NoItem />}
            </Modal>
          </div>
          <div className='column'>
            <button className='dot' onClick={openSellModal}>
              <FontAwesomeIcon className='icon' icon={faReceipt} size="2x" />
              <div>판매내역</div>
            </button>
            <Modal open={sellModalOpen} close={closeSellModal} header="판매내역">
              {sell ? <SellBox props={sell} /> : <NoItem />}
            </Modal>
          </div>
        </div>
        <hr />
        <h4>찜한 상품</h4>
        <div className='hearts'>
          {wish.map((item) => {
            let price = item.product.price
            const productPrice = price.toLocaleString('ko-KR');
            return (
              <a key={item.product.no} href={`/product/${item.product.no}`} style={{ width: '120px', height: '150px', textAlign: 'center', margin: '5px' }}>
                <ImageListItem>
                  <img
                    src={`https://i7c110.p.ssafy.io${item.product.productImg[0].path}`}
                    srcSet={`${item.product.productImg[0]}`}
                    alt={item.product.title}
                    loading="lazy"
                    style={{ height: '150px', objectFit: 'fill' }}
                  />
                  <ImageListItemBar
                    title={item.product.title}
                    subtitle={productPrice}
                  />
                </ImageListItem>
              </a>
            )
          })}
        </div>
        <hr />
      </div>
    </>
  )
}



export default MyPage