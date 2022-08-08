import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Modal from '../components/Modals/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faReceipt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './routers.css';

function MyPage() {

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  console.log(loading)
  useEffect(() => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.token}` }
      //localStorage.getItem('token');
    };


    const getProfile = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/users/me`, requestOptions);
        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

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
    imgdata.append('files',imgupload);
    axios({
      url: '/api/users/update/profile',
      method: 'POST',
      data : imgdata,
      headers :  { Authorization: `Bearer ${localStorage.token}`,
      "Content-Type": "multipart/form-data"}
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const [imgupload,setImgupload] = useState('')
  function imgupdate(e){
    e.preventDefault();
    console.log(e.target.files)
    setImgupload(e.target.files[0])
  }
  console.log(profile)
  console.log(document.getElementById("testtest"))
  return (
    <>
      <NavBar />
      <div className='mypage' style={{ margin: 30 }}>
        <h3>MY PAGE</h3>
        <div className='account_container'>
          <div className='column'><img className='profile_img' src={'https://i7c110.p.ssafy.io'+profile.profileUrl} alt="#"></img></div>
          <div className='column'>
            <div className=''>{profile.nickName}</div>
            <div className=''><a href='/editaccount'>회원정보 수정 자리</a></div>
            <div className=''><a href='#!' onClick={e=>imgTest(e)}>프로필사진 변경</a></div>
            <div className=''>
              <input type="file" accept='image/*' multiple onChange={e=>imgupdate(e)} id="imgChange" hidden={true}></input>
              <button onClick={e=>axiosimgChange(e)}>제출</button>
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
            <Modal open={modalOpen} close={closeModal} header="찜한상품">
              더보기리스트
            </Modal>
          </div>
        </div>
        <br />
        <div>
          상품 6개만 나오게
          없으면 없다 표시
        </div>
        <hr />
      </div>
    </>
  )
}



export default MyPage