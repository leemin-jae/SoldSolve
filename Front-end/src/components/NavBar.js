import './components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from '../store.js'

function NavBar() {

  let dispatch = useDispatch()
  let storeToken = useSelector((state) => { return state })

  function Logout(e) {
    e.preventDefault();
    localStorage.removeItem('token')
    dispatch(getToken(null))
    document.location.href = '/'
  }

  let NavAcouuntTab1 = <li><a href='/login'><h5>로그인</h5></a></li>
  let NavAcouuntTab2 = <li><a href='/signup'><h5>회원가입</h5></a></li>

  if (storeToken.token.token) {
    NavAcouuntTab1 = <li><a href='#!' onClick={(e) => Logout(e)}><h5>로그아웃</h5></a></li>
    NavAcouuntTab2 = <li><a href='/mypage'><h5>마이페이지</h5></a></li>
  }

  return (
    <>
      <nav className="navbar">
        <label className="category_toggle" htmlFor="category">
          <FontAwesomeIcon className='icon' icon={faBars} size="2x" />
        </label>
        <a className="navbar_logo" href='/'><img src={logo} alt="#"></img></a>
        <ul className="screen_menu">
          <li><a className="icon_sort" href='/notice'><FontAwesomeIcon className='icon' icon={faEnvelope} size="2x" /></a></li>
          <li><a className="icon_sort" href='/search'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size="2x" /></a></li>
          {NavAcouuntTab1}
          {NavAcouuntTab2}
        </ul>

        <label className="account_toggle" htmlFor="account">
          <FontAwesomeIcon className='icon' icon={faUser} size="2x" />
        </label>
      </nav>

      <input id="category" type="checkbox"></input>
      <div id="left_toggle">
        <ul>
          <li><a href="#!"><h5>디지털기기</h5></a></li>
          <li><a href="#!"><h5>생활가전</h5></a></li>
          <li><a href="#!"><h5>가구</h5></a></li>
          <li><a href="#!"><h5>패션/잡화</h5></a></li>
          <li><a href="#!"><h5>뷰티/미용</h5></a></li>
          <li><a href="#!"><h5>스포츠</h5></a></li>
          <li><a href="#!"><h5>취미/게임</h5></a></li>
          <li><a href="#!"><h5>도서</h5></a></li>
          <li><a href="#!"><h5>기타</h5></a></li>
        </ul>
      </div>

      <input id="account" type="checkbox"></input>
      <div id="right_toggle">
        <ul className="mobile_menu">
          <li><a href='/notice'><h5>알림함</h5></a></li>
          <li><a href='/search'><h5>검색</h5></a></li>
          {NavAcouuntTab1}
          {NavAcouuntTab2}
        </ul>
      </div>
    </>
  );
}
export default NavBar;