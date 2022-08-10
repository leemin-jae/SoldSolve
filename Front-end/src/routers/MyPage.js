import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Modal from '../components/Modals/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faReceipt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './routers.css';
import { useSelector,useDispatch } from 'react-redux'

import { getInfo } from '../store.js'

import Paper from '@mui/material/Paper';
import '../components/Products/products.css';


function MyPage() {

  let store = useSelector((state) => { return state })
  let dispatch = useDispatch()

  const [wish, setWish] = useState([]);

  useEffect(() => {
    profileUpdate()
    async function wishData() {
      const result = await axios.get(
        `/api/wishes`,
        {
          headers: {
          Authorization: `Bearer ${localStorage.token}`
        }}
      );
      setWish(result.data);
    }
    wishData();
    console.log(wish)

  }, []);

  const ShowWishProducts = (data) => {
    console.log(data.data)
    return (
      <>
        {data.data.map((products) => {
          return (
            <li className='heart_item' key={products.product.no}>
                <a href={`/product/${products.product.no}`}>
                <Paper>
                  <img className='card_image'
                    src={products.product.image}
                    alt={products.product.title}
                  />
                  <div className='card_content'>
                    <h5 className='card_title'>{products.product.title}</h5>
                    <p className='card_text'>{products.product.price}</p>
                  </div>
                  </Paper>
                </a>
            </li>
          );
        })}
      </>
    );
    
  };

  const profile = store.info.info
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   console.log(modalOpen)
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

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


  function profileUpdate(){
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

  return (
    <>
      <NavBar />
      <div className='mypage' style={{ margin: 30 }}>
        <h3>MY PAGE</h3>
        <div className='account_container'>
          <div className='column'>
            <img className='profile_img' src={'https://i7c110.p.ssafy.io' + profile.profileUrl} alt="#"></img>
            <input type="file" accept='image/*' onChange={e => imgupdate(e)} id="imgChange" hidden={true}></input>
            <label className="uploadlabel" htmlFor="imgChange">사진 변경</label>
          </div>
          <div className='column'>
            <div className=''>{profile.nickName}</div>
            <div className=''><a href='/editaccount'>회원정보 수정 자리</a></div>
          </div>
        </div>
        <div className='history_container'>
          <div className='column'>
            <button className='dot' onClick={openBuyModal}>
              <FontAwesomeIcon className='icon' icon={faCartArrowDown} size="2x" />
              <div>구매내역</div>
            </button>
            <Modal open={buyModalOpen} close={closeBuyModal} header="구매내역">
              구매내역리스트
            </Modal>
          </div>
          <div className='column'>
            <button className='dot' onClick={openSellModal}>
              <FontAwesomeIcon className='icon' icon={faReceipt} size="2x" />
              <div>판매내역</div>
            </button>
            <Modal open={sellModalOpen} close={closeSellModal} header="판매내역">
              판매내역리스트
            </Modal>
          </div>
        </div>
        <hr />
        <div className='heart_container'>
          <div className='column'>
            찜한상품
          </div>
          <div className='column'>
            {/* <button className='' onClick={openModal}>
              <div>더보기</div>
            </button> */}
          </div>
        </div>
        <br />
        <div>
          <ul className='hearts'>
            <ShowWishProducts data={wish} />
          </ul>
        </div>
        <hr />
      </div>
    </>
  )
}



export default MyPage