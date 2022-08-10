import React, { useEffect, useState } from 'react';
import { over } from 'stompjs'
import SockJS from 'sockjs-client';
// import axios from 'axios'
import './modal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import axios from 'axios'
// import '../../routers/routers.css'
// import { useNavigate } from 'react-router-dom';

let stompClient = null;

const ModalChat = (props) => {

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  // let navigate = useNavigate()
  const { open, close, header } = props;
  let store = useSelector((state) => { return state })
  const [chats, setChats] = useState([])
  const [you, setYou] = useState(null)
  // const [privateChats, setPrivateChats] = useState(new Map())
  // const [tab, setTab] = useState("CHAT ROOM")
  const [userData, setUserData] = useState()
  // const [dbChats, setDbChats] = useState()

  const onConnected = () => {
    // console.log(payload)
    setUserData({ ...userData, "": true })
    console.log(stompClient)
    console.log(header, '!~!~!')

    stompClient.subscribe(`/sub/chat/room/${header.roomId}`, (payload) => {
      let payloadData = JSON.parse(payload.body);
      chats.push(payloadData);
      setChats([...chats]);
      console.log(chats)
    })
  }

  const onError = err => {
    console.log(err);
    throw err;
  };

  // useEffect(() => {
  //   if (header) {
  //     setUserData({
  //       username: store.info.info.userId,
  //       receivername: header.buyer.nickname,
  //       connected: false,
  //       message: ''
  //     })

  //     if (store.info.info.userId === header.buyer.userid) {
  //       setYou(header.seller.nickname)
  //     } else {
  //       setYou(header.buyer.nickname)
  //     }

  //   }
  // }, [header])

  // useEffect(()=> {
  //   if (header) {
  //   const roomChats = () => {
  //     axios({
  //       url: `/api/room/${header.roomId}`,
  //       method: 'get',
  //     })
  //       .then(res => {
  //         const copyDbChats = res.data.reverse().slice(1, 51)
  //         console.log(copyDbChats)
  //         const copyChats = []
  //         copyDbChats.map(chat => {
  //           console.log(chat.chatContent)
  //           copyChats.push(chat.chatContent)
  //         })
  //         console.log(copyChats)
  //         setDbChats(copyChats)
  //         console.log(dbChats)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  //   roomChats()
  // }
  // }, [header])

  useEffect(() => {
    console.log('연결중')
    // if (stompClient&&stompClient.connected) stompClient.disconnect();
    let Sock = new SockJS('/ws-stomp');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    
    return () => {
      if (stompClient.connected) stompClient.disconnect();
    };
    
  // }, [])
  }, [header])

  useEffect(()=>{
    if (header) {

  }
}, [])

  const handleValue = (e) => {
    
    const { value, name } = e.target
    setUserData({ ...userData, [name]: value })
  }
  // const onPublicMessageReceived = 
  const sendPublicMessage = (e) => {
    e.preventDefault();
    if (stompClient) {
      let chatMessage = {
        sender: store.info.info.userId,
        message: userData.message,
        roomId: header.roomId,
        type: 'TALK'
      }
      console.log(stompClient)
      console.log(chatMessage.message, '12!@#!@#')
      if (chatMessage.message == '' || chatMessage.message == null || chatMessage.message == ' ') {
      alert('메세지를 입력하세요')
    } else {
      stompClient.send('/pub/chat/message/', {}, JSON.stringify(chatMessage))
      setUserData({ ...userData, "message": "" })
    }
    }
  }
  console.log(chats)
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open && userData ? (
        <section>
          <main>
            <div className='chat_box'>
              <FontAwesomeIcon className='buyer_nickname' icon={faChevronLeft} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB', marginRight: '265px', marginBottom: '12px', left: '6px', top: '11px' }} onClick={close} />
              <h3 className='buyer_nickname'>{you}</h3>
              <div className='chat_background'>
                <div className='chat_div' >
                  <ul className='li_box_container'>
                    {/* {dbChats.map(dbChat => {
                      let ChatMessage = null;
                      if (chat.sender === store.info.info.userId) {
                        ChatMessage = <span className='li_box_me' key={userData.userId}>{chat.message}</span>
                      } else {
                        ChatMessage =<span className='li_box_other' key={userData.userId}>{chat.message}</span>
                      }
                      return (
                        <span className='li_box_me' key={userData.userId}>{dbChat.message}</span>
                      )
                    })} */}
                    {chats.map(chat => {
                      // let ChatMessage = null;
                      // if (chat.sender === store.info.info.userId) {
                      //   ChatMessage = <span className='li_box_me' key={userData.userId}>{chat.message}</span>
                      // } else {
                      //   ChatMessage =<span className='li_box_other' key={userData.userId}>{chat.message}</span>
                      // }
                      return (
                        <span className='li_box_me' key={userData.userId}>{chat.message}</span>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className='input_box'>
              <form onSubmit={e => sendPublicMessage(e)} style={{display:'flex', width:'100%'}}>
                <input className='chat_input' type="text" name="message" placeholder={'enter message'} value={userData.message} onChange={handleValue} />
                <FontAwesomeIcon icon={faPaperPlane} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB' }} onClick={e=>sendPublicMessage(e)} />
              </form>
            </div>
          </main>
        </section>
      ) : null
      }
    </div >
  );
};

export default ModalChat;
