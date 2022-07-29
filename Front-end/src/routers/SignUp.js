import NavBar from "../components/NavBar"
import { useState } from 'react'
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'

function SignUp() {
  const [id,setId] = useState(null)
  const [password,setPassword] = useState(null)
  const [pwConfirm,setPwConfirm] = useState(null)
  const [nickname,setNickname] = useState(null)
  const [username,setUsername] = useState(null)
  const [email,setEmail] = useState(null)
  const [button,setButton] = useState('noInput')
  const [idCheck,setIdCheck] = useState(false)
  const [emailCheck,setEmailCheck] = useState(false)

  let submitButton = null;
  if (button === 'noInput') {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  } else if (button === 'input') {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  }
  
  function inputForm(e) {
    if (e.target.name === 'id') {setId(e.target.value) 
      if (e.target.value && email && password && pwConfirm && nickname && username) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}} 

    else if (e.target.name === 'password') {setPassword(e.target.value)
      if (e.target.value && id && email && pwConfirm && nickname && username) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}}

    else if (e.target.name === 'pwconfirm') {setPwConfirm(e.target.value) 
      if (e.target.value && id && password && email && nickname && username) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}}

    else if (e.target.name === 'nickname') {setNickname(e.target.value)
      if (e.target.value && id && password && pwConfirm && email && username) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}}  

    else if (e.target.name === 'username') {setUsername(e.target.value)
      if (e.target.value && id && password && pwConfirm && nickname && email) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}} 

    else if (e.target.name === 'email') {setEmail(e.target.value)
      if (e.target.value && id && password && pwConfirm && nickname && username) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}}
    }


  const signUpForm = {userId:id, password:password, email:email, nickName:nickname, userName:username}

  function submitSignup(e){
    e.preventDefault();
    if (password !== pwConfirm){
      alert("비밀번호가 서로 맞지 않습니다.")
      console.log(e.target.password)
      e.target.password.value = ''
      e.target.pwconfirm.value = ''
      setPassword(null)
      setPwConfirm(null)
      setButton('noInput')
    } else if (idCheck === false) {
      alert("ID 중복체크를 해주세요!")
    } else if (emailCheck === false) {
      alert("Email 중복체크를 해주세요!")
    }
    else{
      axiosSignup(signUpForm)
    }
    
  }


  function axiosSignup(credentials) {
    console.log(credentials)
    axios({
        url:'http://localhost:8080/api/v1/users' ,
        method: 'post',
        data: credentials
      })
    .then(res => {
        alert('회원가입 되었습니다. 로그인을 해주세요!')
        document.location.href = '/login'
    })
    .catch(err => {
        console.log(err)
    })
  }

  function CheckID(e) {
    e.preventDefault();
    axios({
      url:'http://localhost:8080/api/v1/users/idcheck' ,
      method: 'post',
      data: { userId:id}
    })
  .then(res => {
      console.log(res)
      e.target.classList.add('checkedcolor')
      setIdCheck(true)
  })
  .catch(err => {
      console.log(err)
      e.target.classList.remove('checkedcolor')
      setIdCheck(false)
      alert("이미 사용중인 ID 입니다.")
  })
  }


  function CheckEmail(e) {
    e.preventDefault();
    axios({
      url:'http://localhost:8080/api/v1/users/emailcheck' ,
      method: 'post',
      data: { email:email}
    })
  .then(res => {
      console.log(res)
      e.target.classList.add('checkedcolor')
      setEmailCheck(true)
  })
  .catch(err => {
      console.log(err)
      e.target.classList.remove('checkedcolor')
      setEmailCheck(false)
      alert("이미 사용중인 Email 입니다.")
  })
  }


  return (
    <div>
      <NavBar></NavBar>
      <div>
        <div className="test">
          <div className="test3">
            <h1 className="my-5">ACCOUNT CREATE</h1>
            <form onSubmit={e=>{submitSignup(e)}}>
              <input className="inputform" name="id" onChange={e =>{inputForm(e)}} type="text" placeholder="ID"></input><a href="#!" ><FontAwesomeIcon className='IDcheck' onClick={e => CheckID(e)} icon={faSquareCheck} size="2x" /></a><br />
              <input className="inputform" name="password" onChange={e =>{inputForm(e)}} type="password" placeholder="PASSWORD"></input><br />
              <input className="inputform" name="pwconfirm" onChange={e =>{inputForm(e)}} type="password" placeholder="PASSWORD CONFIRM"></input><br />
              <input className="inputform" name="nickname" onChange={e =>{inputForm(e)}} type="text" placeholder="NICKNAME"></input><br />
              <input className="inputform" name="username" onChange={e =>{inputForm(e)}} type="text" placeholder="USERNAME"></input><br />
              <input className="inputform" name="email" onChange={e =>{inputForm(e)}} type="email" placeholder="EMAIL"></input><a href="#!" ><FontAwesomeIcon className='IDcheck' onClick={e => CheckEmail(e)} icon={faSquareCheck} size="2x" /></a><br />
              { submitButton }
            </form>
          </div>   
        </div>
      </div>
    </div>
    )
}

export default SignUp;