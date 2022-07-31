import axios from "axios";
import { useState } from 'react'
function FindID() {

  const [button,setButton] = useState('noInput')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')

  let submitButton = null;
  if (button === 'noInput') {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  } else if (button === 'input') {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  }

  function findID(e) {
    e.preventDefault();
      axios({
        url:'/api/users/confirm/id' ,
        method: 'get',
        params: { userName:name,email:email}
      })
      .then(res => {
        alert(`회원님의 ID는 [${res.data}]입니다`)
      })
      .catch(err => {
        if (err.response.status === 500){
          alert("일치하는 회원정보가 없습니다.")
        }
      })
  }

  function inputEmail(e) {
    setEmail(e.target.value)
    if (name) { setButton('input')}
    if (e.target.value === '') {setButton('noInput')}
  }

  function inputName(e) {
    setName(e.target.value)
    if (email) { setButton('input')}
    if (e.target.value === '') {setButton('noInput')}
  }


  return (
      <div>
        <div className="test">
            <div className="findForm">
              <h5 className="findtext">가입할때 사용하신</h5>
              <h5 className="findtext">이름과 Email을 입력해주세요</h5>
                <form onSubmit={e => findID(e)}>
                  <input className="inputform" onChange={e => inputName(e)} type="text" placeholder="USER NAME"></input><br />
                  <input className="inputform" onChange={e => inputEmail(e)} type="email" placeholder="EMAIL"></input><br />
                  {submitButton}
                </form>
            </div>
        </div>
      </div>
  )
}

export default FindID;