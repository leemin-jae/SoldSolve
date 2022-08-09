import React from 'react';
import NavBar from '../../components/NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import '../../routers/routers.css'
import { useNavigate } from 'react-router-dom';


// import

function ChatRoom() {

  let navigate = useNavigate()
  return (
    <div>
      <NavBar></NavBar>

      <div className='user_box'>
        {/* <div className='user_info'>
          <FontAwesomeIcon icon={faUser} size="2x" style={{ marginRight: '10px', padding: '8px 0 0 8px' }} />
          <p className='user_name' style={{ margin: '1em 1em 1em 0' }}>
            닉네임 (본인이 설정한 지역)</p>
        </div> */}
        <p className='score'>평점</p>
      </div>
      <hr />
      <div className='chat_box'>
        <FontAwesomeIcon className='buyer_nickname' icon={faChevronLeft} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB', marginRight: '265px', marginBottom: '12px' }} onClick={() => {
          navigate(-1)
        }} />
        <div className='buyer_nickname'>상대방 닉네임</div>
        <div className='buyer_nickname'>상대방 닉네임</div>
        <div className='chat_background'>
        </div>
        <div className='input_box'>
          <input className='chat_input' type="text" />
          <FontAwesomeIcon icon={faPaperPlane} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB' }} />
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;