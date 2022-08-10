import './components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, getInfo } from '../store.js'
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let storeToken = useSelector((state) => { return state })

  function Logout(e) {
    e.preventDefault();
    localStorage.removeItem('token')
    dispatch(getToken(null))
    dispatch(getInfo(null))
    document.location.href = '/'
  }

  let NavAcouuntTab1 = <li><a href='/login'><h5>로그인</h5></a></li>
  let NavAcouuntTab2 = <li><a href='/signup'><h5>회원가입</h5></a></li>


  if (storeToken.token.token) {
    NavAcouuntTab1 = <li><a href='#!' onClick={(e) => Logout(e)}><h5>로그아웃</h5></a></li>
    NavAcouuntTab2 = <li><a href='/mypage'><h5>마이페이지</h5></a></li>
  }

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
            <li><a className="icon_sort" href='/notice'><FontAwesomeIcon className='icon' icon={faEnvelope} size="2x" /></a></li>
            <li><a className="icon_sort" href='/search'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size="2x" /></a></li>
            {NavAcouuntTab1}
            {NavAcouuntTab2}
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
          {NavAcouuntTab1}
          {NavAcouuntTab2}
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
            <li><a href='/notice'><h5>알림함</h5></a></li>
            <li><a href='/search'><h5>검색</h5></a></li>
            {NavAcouuntTab1}
            {NavAcouuntTab2}
          </ul>
        </div>
      ) : <div id="right_toggle">
        <ul className="mobile_menu">
          <li><a href='/search'><h5>검색</h5></a></li>
          {NavAcouuntTab1}
          {NavAcouuntTab2}
        </ul>
      </div>}
    </>
  );
}
export default NavBar;