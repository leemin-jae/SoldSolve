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
import { useAccordionButton } from 'react-bootstrap/AccordionButton';




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


  console.log(sell)
  console.log(buy)

  function SellBox() {
    const [data, setData] = useState([]);
    const title = store.info.info.nickName;
    let nTitle = null;
    if (title.length > 8) {
      nTitle = title.substr(0, 8) + "...";
    } else {
      nTitle = title
    }

    useEffect(() => {
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
      }
      fetchData();
    }, []);
    console.log(data, '123123123123')
    return (
      <ImageList sx={{ width: 280, height: 400, justifyContent: 'space-between', margin: 'auto' }} cols={2} rowHeight={150}>
        {data.map((item) => {

          let price = item.price
          const productPrice = price.toLocaleString('ko-KR');
          console.log(item.state)
          return (
            <a href={`/product/${item.no}`} style={{ width: '125px', textAlign: 'center' }}>
              {item.state ? <ImageListItem key={item.no}>
                <img
                  src={`https://i7c110.p.ssafy.io${item.productImg[0].path}`}
                  srcSet={`${item.productImg[0]}`}
                  alt={item.title}
                  loading="lazy"
                  style={{ position: 'relative', height: '150px', objectFit: 'fill', opacity: '60%' }}
                />
                <h4 style={{ position: 'absolute', top: 60, left: 16, color: '#6667ab' }}>판매 완료</h4>

                <ImageListItemBar
                  title={item.title}
                  subtitle={productPrice}
                />
              </ImageListItem> :
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
                </ImageListItem>}
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
        <h3 style={{ margin: 15, position: 'relative', display: 'inline-block' }}>
          {profile.nickName}
          <div className='setting_list'>
            <a href='/editaccount' style={{ margin: '5px', color: 'black' }}><ManageAccountsIcon /></a>
            <input type="file" accept='image/*' onChange={e => imgupdate(e)} id="imgChange" hidden={true}></input>
            <label htmlFor="imgChange"><PhotoCameraIcon /></label>
          </div>
        </h3>
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
              <div>구매상품</div>
            </button>
            <Modal open={buyModalOpen} close={closeBuyModal} header="구매내역">
              {buy ? <BuyBox props={buy} /> : <NoItem />}
            </Modal>
          </div>
          <div className='column'>
            <button className='dot' onClick={openSellModal}>
              <FontAwesomeIcon className='icon' icon={faReceipt} size="2x" />
              <div>판매상품</div>
            </button>
            <Modal open={sellModalOpen} close={closeSellModal} header="판매내역">
              {sell ? <SellBox /> : <NoItem />}
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