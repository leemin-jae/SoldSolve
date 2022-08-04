import React from 'react';
import './modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import '../../routers/routers.css'
// import { useNavigate } from 'react-router-dom';


const ModalChat = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  // let navigate = useNavigate()

  const { open, close } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <main>
            <div className='chat_box'>
              <FontAwesomeIcon className='buyer_nickname' icon={faChevronLeft} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB', marginRight: '265px', marginBottom: '12px' }} onClick={close} />
              <div className='buyer_nickname'>상대방 닉네임</div>
              <div className='buyer_nickname'>상대방 닉네임</div>
              <div className='chat_background'></div>
              <div className='input_box'>
                <input className='chat_input' type="text" />
                <FontAwesomeIcon icon={faPaperPlane} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB' }} />
              </div>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default ModalChat;