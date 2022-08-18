import NavBar from "../components/NavBar"
import { useState } from 'react'
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'

function SignUp() {
  const [id, setId] = useState(null)
  const [password, setPassword] = useState(null)
  const [pwConfirm, setPwConfirm] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [idCheck, setIdCheck] = useState(false)
  const [inputCode, setInputCode] = useState('')
  const [mailCode, setMailCode] = useState('')
  const [waitCode, setWaitCode] = useState(null)
  const [waitID, setWaitID] = useState(null)

  let submitButton = null;
  if (id && password && pwConfirm && nickname && username && email && inputCode) {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  } else {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  }

  function inputCodeForm(e) {
    setInputCode(e.target.value)
  }

  function inputForm(e) {
    if (e.target.name === 'id') { 
      if (waitID) {
        setWaitID(null)
      }
      setId(e.target.value)
    }
    else if (e.target.name === 'password') {
      if (e.target.value.length !== 0 && e.target.value.length < 4) {
        e.target.classList.value = 'inputform signupWarning'
        document.getElementById('PWwarning').hidden = false
        setPassword(null)
      } else {
        e.target.classList.value = 'inputform'
        document.getElementById('PWwarning').hidden = true
        setPassword(e.target.value)
      }
    }

    else if (e.target.name === 'pwconfirm') {
      if (e.target.value.length !== 0 && password !== e.target.value) {
        e.target.classList.value = 'inputform signupWarning'
        document.getElementById('PW2warning').hidden = false
        setPwConfirm(null)
      } else {
        e.target.classList.value = 'inputform'
        document.getElementById('PW2warning').hidden = true
        setPwConfirm(e.target.value)
      }
    }
    else if (e.target.name === 'nickname') {
      if (e.target.value.length !== 0 && (e.target.value.length < 2 || e.target.value.length > 10)) {
        e.target.classList.value = 'inputform signupWarning'
        document.getElementById('Nickwarning').hidden = false
        setNickname(null)
      } else {
        e.target.classList.value = 'inputform'
        document.getElementById('Nickwarning').hidden = true
        setNickname(e.target.value)
      }
    }
    else if (e.target.name === 'username') {
      if (e.target.value.length !== 0 && (e.target.value.length < 2 || e.target.value.length > 10)) {
        e.target.classList.value = 'inputform signupWarning'
        document.getElementById('Namewarning').hidden = false
        setUsername(null)
      } else {
        e.target.classList.value = 'inputform'
        document.getElementById('Namewarning').hidden = true
        setUsername(e.target.value)
      }
    }
    else if (e.target.name === 'email') {
      if (waitCode) {
        setWaitCode(null)
      }
      setEmail(e.target.value)
    }
  }


  const signUpForm = { userId: id, password: password, email: email, nickName: nickname, userName: username }

  function submitSignup(e) {
    e.preventDefault();
    if (inputCode === '') {
      alert("인증코드를 입력해주세요!")
    } else if (password !== pwConfirm) {
      alert("비밀번호가 서로 맞지 않습니다.")
      e.target.password.value = ''
      e.target.pwconfirm.value = ''
      setPassword(null)
      setPwConfirm(null)
    }
    else if (id !== waitID) {
      alert("변경된 아이디 중복체크를 다시 해주세요!")
    }
    else if (email !== waitCode) {
      alert("변경된 이메일로 다시 인증번호를 받아주세요!")
    }
    else if (mailCode !== inputCode) {
      alert("인증번호가 일치하지 않습니다!")
    } else {
      axiosSignup(signUpForm)
    }
  }


  function axiosSignup(credentials) {
    axios({
      url: '/api/users',
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
      url: '/api/users/check/id',
      method: 'get',
      params: { userId: id }
    })
      .then(res => {
        console.log(res)
        e.target.classList.add('emailcode')
        setWaitID(id)
        setIdCheck(true)
      })
      .catch(err => {
        console.log(err)
        e.target.classList.remove('emailcode')
        setIdCheck(false)
        alert("이미 사용중인 ID 입니다.")
      })
  }


  function CheckEmail(e) {
    e.preventDefault();
    setIdCheck(true)
    if (idCheck) {
      axios({
        url: '/api/users/check/email',
        method: 'get',
        params: { email: email }
      })
        .then(res => {
          document.getElementById('CodeForm').hidden = false
          console.log(e.target)
          e.target.classList.add('emailcode')
          e.target.classList.remove('emailcode2')
          alert("인증코드를 전송했습니다. Email을 확인해주세요")
          setWaitCode(email)
          codeEmail(e)
        })
        .catch(err => {
          console.log(err)
          alert("이미 사용중인 Email 입니다.")
          e.target.classList.remove('emailcode')
          e.target.classList.add('emailcode2')
        })
    } else {
      alert("ID 중복확인을 먼저 해주세요!")
    }

  }

  function codeEmail(e) {
    axios({
      url: '/api/users/mail/auth',
      method: 'get',
      params: { email: email }
    })
      .then(res => {
        setMailCode(res.data)
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
            <h1 className="my-5">회원가입</h1>
            <form onSubmit={e => { submitSignup(e) }}>
              <input className="inputform" name="id" onChange={e => { inputForm(e) }} type="text" placeholder="ID"></input><a href="#!" ><FontAwesomeIcon className='IDcheck' onClick={e => CheckID(e)} icon={faSquareCheck} size="2x" /></a><br />
              <input className="inputform" name="password" onChange={e => { inputForm(e) }} type="password" placeholder="PASSWORD"></input><br />
              <p style={{ color: 'red' }} id="PWwarning" hidden={true}>비밀번호는 4자리 이상으로 설정해주세요.</p>
              <input className="inputform" name="pwconfirm" onChange={e => { inputForm(e) }} type="password" placeholder="PASSWORD CONFIRM"></input><br />
              <p style={{ color: 'red' }} id="PW2warning" hidden={true}>비밀번호가 틀렸습니다.</p>
              <input className="inputform" name="nickname" onChange={e => { inputForm(e) }} type="text" placeholder="NICKNAME"></input><br />
              <p style={{ color: 'red' }} id="Nickwarning" hidden={true}>닉네임은 2~10자리로 입력 해주세요.</p>
              <input className="inputform" name="username" onChange={e => { inputForm(e) }} type="text" placeholder="USERNAME"></input><br />
              <p style={{ color: 'red' }} id="Namewarning" hidden={true}>이름은 2~10자리로 입력 해주세요.</p>
              <input className="inputform" name="email" onChange={e => { inputForm(e) }} type="email" placeholder="EMAIL"></input><a href="#!" ><FontAwesomeIcon className='IDcheck' id="IDcheck" onClick={e => CheckEmail(e)} icon={faSquareCheck} size="2x" /></a><br />
              <input className="inputform" id="CodeForm" onChange={e => inputCodeForm(e)} type="password" hidden={true} placeholder="EMAIL CODE"></input><br />
              {submitButton}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;