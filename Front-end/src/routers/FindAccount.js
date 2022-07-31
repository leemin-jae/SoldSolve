import NavBar from "../components/NavBar"
import FindID from "../components/FindAccount/FindID";
import FindPW from "../components/FindAccount/FindPW";
import React, { useState } from 'react'

function FindAccount() {
  const [mode,setMode] = useState('id')

  let FindForm = null
  if (mode === 'id') {
    FindForm = <FindID></FindID> 
  } else {
    FindForm = <FindPW></FindPW>
  }

  function clickTab(e) {
    if (e.target.id === 'findSpan1') {
      setMode('id')
      e.target.className = 'noticeSpan'
      document.getElementById('findSpan2').className = 'noticeSpan2'
    } else {
      e.target.className = 'noticeSpan'
      document.getElementById('findSpan1').className = 'noticeSpan2'
      setMode('pw')
    }
  }

  return (
    <div>
      <NavBar></NavBar>
      <div className="test3">
            <div className="mx-5 my-5">
            <button className="noticeSpan" onClick={e=> clickTab(e)} id="findSpan1">ID 찾기</button><button className="noticeSpan2" onClick={e=> clickTab(e)} id="findSpan2">PW 찾기</button>
            <hr style={{ margin:0 }} />
            { FindForm }
      </div> 
      </div> 
    </div>
  )
}

export default FindAccount;