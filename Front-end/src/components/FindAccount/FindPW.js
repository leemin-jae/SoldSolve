import axios from "axios";
import { useState } from 'react'

function FindPW() {
  const [button,setButton] = useState('noInput')
  const [id,setID] = useState('')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')

  let submitButton = null;
  if (button === 'input') {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  } else if (button === 'noInput') {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  }

  function inputForm(e) {
    if (e.target.id === 'PW_id') {
      setID(e.target.value) 
      if (e.target.id && name && email) {setButton('input')}
    }
    else if (e.target.id === 'PW_name') {
      setName(e.target.value) 
      if (id && e.target.id && email) {setButton('input')}
    }
    else if (e.target.id === 'PW_email') {
      setEmail(e.target.value) 
      if (id && name && e.target.id) {setButton('input')}
    }
    if (e.target.value === '') {setButton('noInput')}
  }

  function findPW(e) {
    e.preventDefault();
    axios({
      url:'/api/users/mail/password',
      method: 'Patch',
      data: { userId:id, userName:name, email:email}
    })
    .then(res => {
      alert("메일로 임시 비밀번호가 전송되었습니다!")
      document.location.href = '/login'
    })
    .catch(err => {
      if (err.response.status === 400) {
        alert("일치하는 회원 정보가 존재하지 않습니다.")
      }
    })
  }

  return (
    <div>
      <div className="test">
            <div className="findForm">
              <h5 className="findtext">가입할때 사용하신</h5>
              <h5 className="findtext">ID와 이름, Email을 입력해주세요</h5>
                <form onSubmit={e => findPW(e)}>
                  <input className="inputform" id="PW_id" onChange={e=> inputForm(e)} type="text" placeholder="ID"></input><br />
                  <input className="inputform" id="PW_name" onChange={e=> inputForm(e)} type="text" placeholder="USER NAME"></input><br />
                  <input className="inputform" id="PW_email" onChange={e=> inputForm(e)} type="email" placeholder="EMAIL"></input><br />
                  {submitButton}
                </form>
            </div>
        </div>
    </div>
  );
}

export default FindPW;