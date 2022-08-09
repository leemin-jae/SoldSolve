import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Modal from '../components/Modals/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faReceipt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './routers.css';
import { useSelector } from 'react-redux'

import Paper from '@mui/material/Paper';
import '../components/Products/products.css';


function MyPage() {

  let store = useSelector((state) => { return state })

  const [wish, setWish] = useState([]);

  useEffect(() => {
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
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log(modalOpen)
    setModalOpen(true);
  };
  const closeModal = () => {
    console.log(modalOpen)
    setModalOpen(false);
  };

  function imgTest(e) {
    e.preventDefault();
    if (document.getElementById('imgChange').hidden) {
      document.getElementById('imgChange').hidden = false
    } else {
      document.getElementById('imgChange').hidden = true
    }

  }
  function axiosimgChange(e) {
    e.preventDefault();
    const imgdata = new FormData();
    imgdata.append('files', imgupload);
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
      })
      .catch(err => {
        console.error(err)
      })
  }

  const [imgupload, setImgupload] = useState('')
  function imgupdate(e) {
    e.preventDefault();
    console.log(e.target.files)
    setImgupload(e.target.files[0])
  }

  return (
    <>
      <NavBar />
      <div className='mypage' style={{ margin: 30 }}>
        <h3>MY PAGE</h3>
        <div className='account_container'>
          <div className='column'><img className='profile_img' src={'https://i7c110.p.ssafy.io' + profile.profileUrl} alt="#"></img></div>
          <div className='column'>
            <div className=''>{profile.nickName}</div>
            <div className=''><a href='/editaccount'>회원정보 수정 자리</a></div>
            <div className=''><a href='#!' onClick={e => imgTest(e)}>프로필사진 변경</a></div>
            <div className=''>
              <input type="file" accept='image/*' multiple onChange={e => imgupdate(e)} id="imgChange" hidden={true}></input>
              <button onClick={e => axiosimgChange(e)}>제출</button>
            </div>

          </div>
        </div>
        <div className='history_container'>
          <div className='column'>
            <button className='dot' onClick={openModal}>
              <FontAwesomeIcon className='icon' icon={faCartArrowDown} size="2x" />
              <div>구매내역</div>
            </button>
            <Modal open={modalOpen} close={closeModal} header="구매내역">
              구매내역리스트
            </Modal>
          </div>
          <div className='column'>
            <button className='dot' onClick={openModal}>
              <FontAwesomeIcon className='icon' icon={faReceipt} size="2x" />
              <div>판매내역</div>
            </button>
            <Modal open={modalOpen} close={closeModal} header="판매내역">
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
            <button className='' onClick={openModal}>
              <div>더보기</div>
            </button>
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