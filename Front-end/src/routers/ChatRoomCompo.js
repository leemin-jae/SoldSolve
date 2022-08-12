import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { faPaperPlane, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'



let stompClient = null;
function ChatRoomCompo() {
  let store = useSelector((state) => { return state })
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { state } = useLocation();
  const [roomId, setRoomId] = useState(state.roomId);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [dbChats, setDbChats] = useState()
  const [other, setOther] = useState('')

  useEffect(() => {
    let Sock = new SockJS('/ws-stomp');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);

    return () => {
      if (stompClient.connected) stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    const roomChats = () => {
      axios({
        url: `/api/room/${roomId}`,
        method: 'get',
      })
        .then(res => {
          console.log(res.data)
          const copyDbChats = res.data.reverse().slice(0, 50)
          console.log(copyDbChats)
          const copyChats = []
          copyDbChats.reverse().map(chat => {
            console.log(chat.chatContent)
            copyChats.push(chat)
          })
          console.log(copyChats)
          setDbChats(copyChats)
          console.log(dbChats)
        })
        .catch(err => {
          console.log(err)
        })
    }
    roomChats()
  }, [chats])

  const onConnected = () => {
    console.log('연결완료');
    stompClient.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived);
  };

  const onMessageReceived = payload => {
    let payloadData = JSON.parse(payload.body);
    chats.push(payloadData);
    setChats([...chats]);
  };

  const sendChatHandler = (e) => {
    e.preventDefault();
    if (stompClient) {
      const chatMessage = {
        sender: store.info.info.userId,
        message: message,
        roomId: state.roomId,
        type: 'TALK'
      };
      stompClient.send('/pub/chat/message/', {}, JSON.stringify(chatMessage));
    }
    setMessage('');
    inputRef.current.focus();
  };


  const onError = err => {
    console.log(err);
    throw err;
  };

  console.log(message, chats)
  return (
    <div>
      <div className='chat_box'>
        <FontAwesomeIcon className='buyer_nickname' icon={faChevronLeft} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB', marginRight: '265px', marginBottom: '12px', left: '6px', top: '11px', cursor: 'pointer' }} onClick={() => { navigate(-1) }} />
        <h3 className='buyer_nickname'>{state.you}</h3>
        <div className='chat_background'>
          <div className='chat_div' >
            <ul className='li_box_container'>
              {dbChats && dbChats.map(dbChat => {
                // let ChatMessage = null;
                // if (chat.sender === store.info.info.userId) {
                //   ChatMessage = <span className='li_box_me' key={userData.userId}>{chat.message}</span>
                // } else {
                //   ChatMessage =<span className='li_box_other' key={userData.userId}>{chat.message}</span>
                // }
                console.log(dbChat.writeUser.nickname, store.info.info.nickName)
                if (dbChat.writeUser.nickname === store.info.info.nickName) {
                  return (
                    <span className='li_box_me' key={uuid()}>{dbChat.chatContent}</span>
                  )
                } else {
                  return (
                    <span className='li_box_other' key={uuid()}>{dbChat.chatContent}</span>
                  )
                }
              })}
              {/* {chats.map(chat => {
                // if (state.meId ==)
                // let ChatMessage = null;
                // if (chat.sender === store.info.info.userId) {
                //   ChatMessage = <span className='li_box_me' key={userData.userId}>{chat.message}</span>
                // } else {
                //   ChatMessage =<span className='li_box_other' key={userData.userId}>{chat.message}</span>
                // }
                return (
                  <span className='li_box_me' key={uuid()}>{chat.message}</span>
                )
              })} */}
            </ul>
          </div>
        </div>
      </div>
      <div className='input_box'>
        <form onSubmit={e => sendChatHandler(e)} style={{ display: 'flex', width: '100%' }}>
          <input className='chat_input' ref={inputRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            type="text"
            placeholder="메시지를 입력하세요"></input>
          <FontAwesomeIcon icon={faPaperPlane} style={{ float: 'right', width: '28px', height: '28px', margin: '4px 2px 0 8px', color: '#6667AB' }} onClick={e => sendChatHandler(e)} />
        </form>
      </div>
    </div >

  );
}

export default ChatRoomCompo;