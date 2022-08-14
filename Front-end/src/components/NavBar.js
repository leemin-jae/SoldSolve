import './components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faEnvelope, faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, getInfo } from '../store.js'
import { Link, useNavigate } from 'react-router-dom';
import ManagementModal from './Modals/ManagementModal';
import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import axios from 'axios';

let stompClient = null;
function NavBar() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let storeToken = useSelector((state) => { return state })

  const [noticeCount, setNoticeCount] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);

  const onConnected = () => {
    console.log(storeToken.token.token, '토큰확인')
    const chatMessage = {
      sender: storeToken.info.info.userId,
      message: '',
      roomId: 'join' + storeToken.info.info.userId,
      type: 'TALK'
    };
    console.log('연결완료');
    stompClient.subscribe(`/sub/chat/room/join${storeToken.info.info.userId}`);
    chatMessage['type'] = 'JOIN'
    stompClient.send('/pub/chat/message/', {}, JSON.stringify(chatMessage))

  };

  useEffect(() => {
    console.log(storeToken.token.token, '토큰확인')
    if (storeToken.token.token) {
      let Sock = new SockJS('/ws-stomp');
      console.log(Sock)
      stompClient = over(Sock);
      stompClient.connect({}, onConnected);
    }
  }, []);

  useEffect(()=> {
    axios({
      url: `api/messages/count`,
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        console.log(res.data)
        setNoticeCount(res.data)
        console.log(noticeCount, '남은 알림 개수')
      })
      .catch(err => {
        console.log(err)
      })
  }, [noticeCount])

  function Logout(e) {
    e.preventDefault();
    alert('로그아웃되었습니다')
    localStorage.removeItem('token')
    dispatch(getToken(null))
    dispatch(getInfo(null))
    document.location.href = '/'
    stompClient.disconnect(`/sub/chat/room/join${storeToken.info.info.userId}`)

  }

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const Token = storeToken.token.token
  return (
    <>
      {Token ? (
        <nav className="navbar">
          <label className="category_toggle" htmlFor="category">
            <FontAwesomeIcon className='icon' icon={faBars} size="2x" />
          </label>
          <a className="navbar_logo" href='/'><img src={logo} alt="#"></img></a>
          <ul className="screen_menu">
            {storeToken.info.info.role === 'ROLE_ADMIN' ?
              <li><a className="icon_sort" href='#!' onClick={openModal}><FontAwesomeIcon className='icon' icon={faGear} size="2x" /></a></li>
              : null}
            <li><a className="icon_sort" href='/notice'><FontAwesomeIcon className='icon' icon={faEnvelope} size="2x" /></a></li>
            <li><a className="icon_sort" href='/search'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size="2x" /></a></li>
            <li><a href='#!' onClick={(e) => Logout(e)}><h5>로그아웃</h5></a></li>
            <li><a href='/mypage'><h5>마이페이지</h5></a></li>
          </ul>

          <label className="account_toggle" htmlFor="account">
            <FontAwesomeIcon className='icon' icon={faUser} size="2x" />
          </label>
        </nav>
      ) : <nav className="navbar">
        <label className="category_toggle" htmlFor="category">
          <FontAwesomeIcon className='icon' icon={faBars} size="2x" />
        </label>
        <a className="navbar_logo" href='/'><img src={logo} alt="#"></img></a>
        <ul className="screen_menu">
          <li><a className="icon_sort" href='/search'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size="2x" /></a></li>
          <li><a href='/login'><h5>로그인</h5></a></li>
          <li><a href='/signup'><h5>회원가입</h5></a></li>
        </ul>

        <label className="account_toggle" htmlFor="account">
          <FontAwesomeIcon className='icon' icon={faUser} size="2x" />
        </label>
      </nav>}

      <input id="category" type="checkbox"></input>
      <div id="left_toggle">
        <button onClick={() => {
          navigate('/createproduct')
        }} style={{ backgroundColor: '#6667ab', color: 'white', width: '132px', height: '40px', textAlign: 'center', border: '0', borderRadius: '10px', alignContent: 'center', margin: '20px auto auto auto' }} >상품 등록하기</button>
        <h3 style={{ textAlign: 'center', margin: '20px 0 0 0', color: '#6667ab' }}>Category</h3><hr />
        <ul>
          <li><Link to={`/product`} state={{ category: "digital" }}><h5>디지털기기</h5></Link></li>
          <li><Link to={`/product`} state={{ category: "appliances" }}><h5><input id="category" type="checkbox"></input>생활가전</h5></Link></li>
          <li><Link to={`/product`} state={{ category: "furniture" }}><h5><input id="category" type="checkbox"></input>가구</h5></Link></li>
          <li><Link to={`/product`} state={{ category: "fashion" }}><h5>패션/잡화</h5></Link></li>
          <li><Link to={`/product`} state={{ category: "beauty" }}><h5>뷰티/미용</h5></Link></li>
          <li><Link to={`/product`} state={{ category: "sports" }}><h5>스포츠</h5></Link></li>
          <li><Link to={`/product`} state={{ category: "games" }}><h5>취미/게임</h5></Link></li>
          <li><Link to={`/product`} state={{ category: "book" }}><h5>도서</h5></Link></li>
          <li><Link to={`/product`} state={{ category: "etc" }}><h5>기타</h5></Link></li>
        </ul>
      </div>
      <input id="account" type="checkbox"></input>




      {Token ? (
        <div id="right_toggle">
          <ul className="mobile_menu">
            {storeToken.info.info.role === 'ROLE_ADMIN' ?
              <li><a href='#!' onClick={openModal}><h5>유저관리</h5></a></li>
              : null}
            <li><a href='/notice'><h5>알림함</h5></a></li>
            <li><a href='/search'><h5>검색</h5></a></li>
            <li><a href='#!' onClick={(e) => Logout(e)}><h5>로그아웃</h5></a></li>
            <li><a href='/mypage'><h5>마이페이지</h5></a></li>
          </ul>
        </div>
      ) : <div id="right_toggle">
        <ul className="mobile_menu">
          <li><a href='/search'><h5>검색</h5></a></li>
          <li><a href='/login'><h5>로그인</h5></a></li>
          <li><a href='/signup'><h5>회원가입</h5></a></li>
        </ul>
      </div>}
      <ManagementModal open={modalOpen} close={closeModal}></ManagementModal>
    </>
  );
}
export default NavBar;