import './components.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.png'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { getToken } from '../store.js'

function NavBar() {

  let dispatch = useDispatch()
  let storeToken = useSelector((state) => { return state })

  function axiosLogout() {
    axios({
      url: 'http://localhost:8000/accounts/logout/',
      method: 'post',
      headers: { Authorization: `Token ${localStorage.token}` }
    })
      .then(res => {
        console.log(res.data.key)
        localStorage.removeItem('token')
        dispatch(getToken(null))
        document.location.href = '/'
      })
      .catch(err => {
        console.log(err)
      })
  }

  let NavAcouuntTab1 = <li><a href='/login'><h5>로그인</h5></a></li>
  let NavAcouuntTab2 = <li><a href='/signup'><h5>회원가입</h5></a></li>

  if (storeToken.token.token || localStorage.token) {
    NavAcouuntTab1 = <li><a href='#!' onClick={() => axiosLogout()}><h5>로그아웃</h5></a></li>
    NavAcouuntTab2 = <li><a href='/#'><h5>마이페이지</h5></a></li>
  }

  return (
    <>
      <nav className="navbar">
        <label className="category_toggle" for="category">
          <FontAwesomeIcon className='icon' icon={faBars} size="2x" />
        </label>
        <a className="navbar_logo" href='/'><img src={logo} alt="#"></img></a>
        <ul className="screen_menu">
          <li><a className="icon_sort" href='/'><FontAwesomeIcon className='icon' icon={faEnvelope} size="2x" /></a></li>
          <li><a className="icon_sort" href='/search'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size="2x" /></a></li>
          {NavAcouuntTab1}
          {NavAcouuntTab2}
        </ul>

        <label className="account_toggle" for="account">
          <FontAwesomeIcon className='icon' icon={faUser} size="2x" />
        </label>
      </nav>

      <input id="category" type="checkbox"></input>
      <div id="left_toggle">
        <ul>
          <li><a href="#!">shoes</a></li>
          <li><a href="#!">bag</a></li>
        </ul>
      </div>

      <input id="account" type="checkbox"></input>
      <div id="right_toggle">
        <ul className="mobile_menu">
          <li><a href='/'><FontAwesomeIcon className='icon' icon={faEnvelope} size="2x" /></a></li>
          <li><a href='/search'><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} size="2x" /></a></li>
          {NavAcouuntTab1}
          {NavAcouuntTab2}
        </ul>
      </div>
    </>
  );
}
export default NavBar;