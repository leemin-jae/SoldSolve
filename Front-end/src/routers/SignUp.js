import NavBar from "../components/NavBar"
import { useState } from 'react'
import axios from "axios"


function SignUp() {
  const [id,setId] = useState(null)
  const [password,setPassword] = useState(null)
  const [pwConfirm,setPwConfirm] = useState(null)
  const [nickname,setNickname] = useState(null)
  const [username,setUsername] = useState(null)
  const [email,setEmail] = useState(null)
  const [button,setButton] = useState('noInput')

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


  const signUpForm = {id:id, password:password, email:email, nickName:nickname, userName:username}

  function submitLogin(e){
    e.preventDefault();
    if (password === pwConfirm){
      axiosSignup(signUpForm)
    } else{
      alert("비밀번호가 서로 맞지 않습니다.")
      console.log(e.target.password)
      e.target.password.value = ''
      e.target.pwconfirm.value = ''
      setPassword(null)
      setPwConfirm(null)
      setButton('noInput')
    }
    
  }


  function axiosSignup(credentials) {
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

  return (
    <div>
      <NavBar></NavBar>
      <div>
        <div className="test">
          <div className="test3">
            <h1 className="my-5">ACCOUNT CREATE</h1>
            <form onSubmit={e=>{submitLogin(e)}}>
              <input className="inputform" name="id" onKeyUp={e =>{inputForm(e)}} type="text" placeholder="ID"></input><br />
              <input className="inputform" name="password" onKeyUp={e =>{inputForm(e)}} type="password" placeholder="PASSWORD"></input><br />
              <input className="inputform" name="pwconfirm" onKeyUp={e =>{inputForm(e)}} type="password" placeholder="PASSWORD CONFIRM"></input><br />
              <input className="inputform" name="nickname" onKeyUp={e =>{inputForm(e)}} type="text" placeholder="NICKNAME"></input><br />
              <input className="inputform" name="username" onKeyUp={e =>{inputForm(e)}} type="text" placeholder="USERNAME"></input><br />
              <input className="inputform" name="email" onKeyUp={e =>{inputForm(e)}} type="email" placeholder="EMAIL"></input><br />
              { submitButton }
            </form>
          </div>   
        </div>
      </div>
    </div>
    )
}

export default SignUp;