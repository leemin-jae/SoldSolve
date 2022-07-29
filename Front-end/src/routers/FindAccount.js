import NavBar from "../components/NavBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { useState } from 'react'

function FindAccount() {

  const [button,setButton] = useState('noInput')
  const [email,setEmail] = useState('')
  const [code, setCode] = useState('')
  const [inputCode,setInputCode] = useState('')

  let submitButton = null;
  if (button === 'noInput') {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  } else if (button === 'input') {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  }

  function codeCheck(e) {
    e.preventDefault();
    if (code === inputCode) {
      alert("인증번호가 일치합니다.")
    } else {
      alert("인증번호가 일치하지 않습니다.")
    }
  }

  function inputEmail(e) {
    setEmail(e.target.value)
  }

  function inputCodeForm(e) {
    setInputCode(e.target.value)
  }


  function CheckEmail(e) {
    axios({
      url:'http://localhost:8080/api/v1/users/emailcheck' ,
      method: 'post',
      data: { email:email}
    })
    .then(res => {
      console.log(res)
      e.target.classList.remove('emailcode')
      alert("사용중이지 않는 이메일 입니다.")
    })
    .catch(err => {
        console.log(err)
        codeEmail(e)
    })
  }

  function codeEmail(e) {
    axios({
      url:'http://localhost:8080/api/v1/users/AuthMail' ,
      method: 'post',
      data: { email:email}
    })
    .then(res => {
        console.log(res.data)
        setCode(res.data)
        e.target.classList.add('emailcode')
        setButton('input')
        document.getElementById('FindEmailForm').setAttribute('disabled',true)
        alert("인증코드를 전송했습니다. Email을 확인해주세요")
    })
    .catch(err => {
        console.log(err)
        e.target.classList.remove('emailcode')
    })
  }
  return (
    <div>
      <NavBar></NavBar>
      <div>
        <div className="test">
          <div className="test3">
            <h1 className="my-5">ID/PW 찾기</h1>
            <div className="form">
              <h5 className="findtext">가입할때 사용하신 Email을 통해</h5>
              <h5 className="findtext">인증번호를 입력해주세요</h5>
                <form onSubmit={e => codeCheck(e)}>
                  <input className="inputform" id="FindEmailForm" onChange={e => inputEmail(e)} type="email" placeholder="EMAIL"></input><a href="#!"><FontAwesomeIcon className='IDcheck' onClick={e => CheckEmail(e)} icon={faSquareCheck} size="2x" /></a><br />
                  <input className="inputform" onChange={e => inputCodeForm(e)} type="password" placeholder="EMAIL CODE"></input><br />
                  {submitButton}
                </form>
            </div>
          </div>   
        </div>
      </div>
    </div>
  )
}

export default FindAccount;