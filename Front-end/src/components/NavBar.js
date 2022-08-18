import './components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faEnvelope, faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, getInfo, asyncOnclickMessage } from '../store.js'
import { Link, useNavigate } from 'react-router-dom';
import ManagementModal from './Modals/ManagementModal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/components.css'

function NavBar() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let storeToken = useSelector((state) => { return state })
  let storeMessage = useSelector((state) => { return state.noticeCount.noticeCount })
  // const [noticeCount, setNoticeCount] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios({
      url: `https://i7c110.p.ssafy.io/api/messages/count`,
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        dispatch(asyncOnclickMessage(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }, [storeMessage])

  function Logout(e) {
    e.preventDefault();
    deleteToken()
    alert('로그아웃되었습니다')
    document.location.href = '/'
  }
  function deleteToken() {
    localStorage.removeItem('token')
    dispatch(getToken(null))
    dispatch(getInfo(null))
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
        <div className='navbarColor2'>
          <div className='navbarColor'>
            <nav className="navbar">
              <label className="category_toggle" htmlFor="category">
                <FontAwesomeIcon style={{ cursor: 'pointer' }} className='icon' icon={faBars} size="2x" />
              </label>
              <a className="navbar_logo2" href='/'><img src={logo} alt="#"></img></a>
              <ul className="screen_menu">
                {storeToken.info.info.role === 'ROLE_ADMIN' ?
                  <li><a className="icon_sort" href='#!' onClick={openModal}><FontAwesomeIcon className='icon' icon={faGear} size="2x" /></a></li>
                  : null}
                {storeToken.noticeCount.noticeCount !== 0 ?
                  <li>
                    <a className="icon_sort" href='/notice' style={{ position: 'relative' }}><FontAwesomeIcon className='icon' icon={faEnvelope} size="2x"  ></FontAwesomeIcon>
                      <div className='unread_message' style={{ position: 'absolute', top: '-18px', left: '22px', width: '20px', height: '20px', fontSize: '15px', lineHeight: '18px' }}>{storeToken.noticeCount.noticeCount}</div>
                    </a>
                  </li>
                  :
                  <div>
                    <li><a className="icon_sort" href='/notice'><FontAwesomeIcon className='icon' icon={faEnvelope} size="2x" style={{ position: 'relative' }} /></a></li>
                  </div>}

                <li><a className="icon_sort" href='/search'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size="2x" /></a></li>
                <li><a href='#!' onClick={(e) => Logout(e)}><h5>로그아웃</h5></a></li>
                <li><a href='/mypage'><h5>마이페이지</h5></a></li>
              </ul>
              {storeToken.noticeCount.noticeCount !== 0 ?

                <label className="account_toggle" htmlFor="account" style={{ position: 'relative' }}>
                  <FontAwesomeIcon className='icon' icon={faUser} size="2x" />
                  <div className='unread_message' style={{ position: 'absolute', top: '-12px', left: '22px', width: '20px', height: '20px', fontSize: '15px', lineHeight: '18px' }}>{storeToken.noticeCount.noticeCount}</div>
                </label>
                :
                <label className="account_toggle" htmlFor="account">
                  <FontAwesomeIcon className='icon' icon={faUser} size="2x" />
                </label>}
            </nav>
          </div>
        </div>
      ) :
        <div className='navbarColor2'>
          <div className='navbarColor'>
            <nav className="navbar navbarColor">
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
              {storeToken.noticeCount.noticeCount !== 0 && Token ?
                <div className='unread_message' style={{ position: 'absolute', top: '12px', right: '233px', width: '20px', height: '20px', fontSize: '15px', lineHeight: '18px' }}>{storeToken.noticeCount.noticeCount}</div>
                :
                null
              }
            </nav>
          </div>
        </div>
      }

      <input id="category" type="checkbox"></input>
      <div id="left_toggle">
        {storeToken.token.token ? <button onClick={() => {
          navigate('/createproduct')
        }} style={{ backgroundColor: '#6667ab', color: 'white', width: '132px', height: '40px', textAlign: 'center', border: '0', borderRadius: '10px', alignContent: 'center', margin: '20px auto auto auto' }} >상품 등록하기</button>
          : <button onClick={() => {
            alert('로그인 후 이용해주세요!')
            navigate('/login')
          }} style={{ backgroundColor: '#6667ab', color: 'white', width: '132px', height: '40px', textAlign: 'center', border: '0', borderRadius: '10px', alignContent: 'center', margin: '20px auto auto auto' }} >상품 등록하기</button>}

        <h3 style={{ textAlign: 'center', margin: '20px 0 0 0', color: '#6667ab' }}>Category</h3><hr />
        <ul>
          <li><Link to={`/product`} state={{ category: "all" }}><h5>전체상품</h5></Link></li>
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
            <div>
              <li>
                <a href='/notice' >
                  <h5 style={{ position: 'relative', display: 'inline' }}>
                    알림함
                    {storeToken.noticeCount.noticeCount !== 0 ?

                      <div className='unread_message' style={{ position: 'absolute', top: '1px', left: '60px', width: '20px', height: '20px', fontSize: '15px', lineHeight: '18px' }}>{storeToken.noticeCount.noticeCount}</div> :
                      null}
                  </h5>

                </a></li>

            </div>
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