
import React from 'react';
import NavBar from '../components/NavBar';
import './routers.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'




function LiveDetail() {
  return (
    <div>
      <NavBar></NavBar>
      <div className='container'>
        <div>
          <div className='livebox'><h3>live</h3></div>
          <p style={{ margin: '1em' }}><FontAwesomeIcon icon={faUser} size="2x" style={{ marginRight: '10px' }} />
            닉네임 (본인이 설정한 지역), 평점</p>
          <p style={{ margin: '1em' }}> ~~~~ 팝니다!</p>
          <hr style={{ width: '100%' }} />
        </div>
        <div>
          <div className='chatbox'><h3>채팅방</h3></div>
          <input className='inputform3' type="text" />
          <button className='inputsubmitbutton'>입력</button>
        </div>

      </div>

    </div>
  );
}

export default LiveDetail;