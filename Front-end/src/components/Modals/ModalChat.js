import React, { useEffect, useState } from 'react';
import { over } from 'stompjs'
import SockJS from 'sockjs-client';
import axios from 'axios'
import './modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
// import '../../routers/routers.css'
// import { useNavigate } from 'react-router-dom';

let stompClient = null

const ModalChat = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  // let navigate = useNavigate()

  const { open, close, header } = props;

  const [chats, setChats] = useState([])
  // const [privateChats, setPrivateChats] = useState(new Map())
  // const [tab, setTab] = useState("CHAT ROOM")
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: ''
  })
  const onConnected = () => {
    // console.log(payload)
    setUserData({ ...userData, "": true })
    console.log('???')
    console.log(stompClient)
    stompClient.subscribe('/sub/chat/room/1', (payload) => {
      let payloadData = JSON.parse(payload.body);
      chats.push(payloadData);
      setChats([...chats]);
      console.log(chats)
    })
  }

  useEffect(() => {
    let Sock = new SockJS("http://localhost:8080/ws-stomp")
    // console.log(Sock)
    stompClient = over(Sock)
    stompClient.connect({}, onConnected)
    // const userJoin = () => {
    //   // let chatMessage = {
    //   //   senderName: userData.username,
    //   //   status: 'JOIN'
    //   }
    //   // stompClient.send('/sub/chat/room/1', {}, JSON.stringify(chatMessage))
    //   console.log('!@#!@#!@#')
    // }
  }, [])
  const getAxios = () => {
    axios.get('http://localhost:8080/api/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.token}` //the token is a variable which holds the token
      }
    }).then(res => {
      setUserData({ ...userData, 'username': res.data.userId })
    }).catch(err => console.log(err.response.status))
  }
  const handleValue = (e) => {
    const { value, name } = e.target
    setUserData({ ...userData, [name]: value })
  }
  // const onPublicMessageReceived = 
  const sendPublicMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        roomId: '1',
        status: 'MESSAGE'
      }
      stompClient.send('/pub/chat/message/', {}, JSON.stringify(chatMessage))
      setUserData({ ...userData, "message": "" })
      console.log(userData)
    }
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <main>
            <div className='chat_box'>
              <FontAwesomeIcon className='buyer_nickname' icon={faChevronLeft} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB', marginRight: '265px', marginBottom: '12px', left: '6px', top: '11px' }} onClick={close} />
              <h3 className='buyer_nickname'>{header}</h3>
              <div className='chat_background'>
                <div className='chat_div' >
                  <ul className='li_box_container'>
                    {chats.map(chat => {
                      return (
                        <span className='li_box_me' key={userData.userId}>{chat.message}</span>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className='input_box'>
              <input className='chat_input' type="text" name="message" placeholder={'enter message'} value={userData.message} onChange={handleValue} />
              <FontAwesomeIcon icon={faPaperPlane} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB' }} onClick={sendPublicMessage} />
            </div>
          </main>
        </section>
      ) : null
      }
    </div >
  );
};

export default ModalChat;