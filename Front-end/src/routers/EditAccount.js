import NavBar from "../components/NavBar"
import axios from "axios"
import { useState } from 'react'
function EditAccount() {
  const [nickname,setNickname] = useState(null)
  const [password,setPassword] = useState(null)
  const [pwConfirm,setPwConfirm] = useState(null)
  const [button,setButton] = useState('noInput')

  const editAccountForm = {nickname:nickname,password:password}

  function inputForm(e) {
    if (e.target.name === 'nickname') {setNickname(e.target.value) 
      if (e.target.value && password && pwConfirm && nickname) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}} 

    else if (e.target.name === 'password') {setPassword(e.target.value)
      if (e.target.value && pwConfirm && nickname) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}}

    else if (e.target.name === 'pwconfirm') {setPwConfirm(e.target.value) 
      if (e.target.value && password && nickname) {setButton('input')}
      else if (e.target.value ==='') {setButton('noInput')}}
  }

  let submitButton = null;
  if (button === 'noInput') {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  } else if (button === 'input') {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  }

  function editAccount(e) {
    e.preventDefault();
    if (password === pwConfirm){
      console.log(editAccountForm)
      axios({
      url: 'http://localhost:8080/api/v1/auth/login',
      method: 'post',
      data: editAccountForm
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err.response.data)
      })
    } else {
      alert("비밀번호가 맞지 않습니다.")
    }
  }

  function deleteAccount(e){
    e.preventDefault();
    if (window.confirm("정말 회원을 탈퇴 하시겠습니까?")) {
      axios({
        url: 'http://localhost:8080/api/v1/auth/login',
        method: 'post',
        data: editAccountForm
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }


  return (
    <div>
      <NavBar></NavBar>
      <div>
        <div className="test">
          <div className="test3">
            <h1 className="my-5">회원정보수정</h1>
            <div className="form">
                <form onSubmit={e => editAccount(e)}>
                  <input className="inputform" name="nickname" onKeyUp={e =>{inputForm(e)}} type="text" placeholder="NICKNAME"></input><br />
                  <input className="inputform" name="password" onKeyUp={e =>{inputForm(e)}} type="password" placeholder="PASSWORD"></input><br />
                  <input className="inputform" name="pwconfirm" onKeyUp={e =>{inputForm(e)}} type="password" placeholder="PASSWORD CONFIRM"></input><br />
                  <a className="atag" onClick={e => deleteAccount(e)} href="#!">회원 탈퇴하기</a>
                  {submitButton}
                </form>
            </div>
          </div>   
        </div>
      </div>
    </div>
  )
}

export default EditAccount;