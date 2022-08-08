import React, { useEffect, useState } from 'react';
import { over } from 'stompjs'
import SockJS from 'sockjs-client';
import axios from 'axios'

let stompClient = null

function ChatTest() {
  const [chats, setChats] = useState([])
  // const [privateChats, setPrivateChats] = useState(new Map())
  // const [tab, setTab] = useState("CHAT ROOM")
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: '',
    roomId: 1
  })
  const onConnected = () => {
    // console.log(payload)
    setUserData({ ...userData, "": true })
    console.log('???')
    console.log(stompClient)
    console.log(typeof (1))
    console.log(`/sub/chat/room/${2}`)
    stompClient.subscribe(`/sub/chat/room/${2}`, (payload) => {
      console.log(payload, '!@@@@@@')
      let payloadData = JSON.parse(payload.body);
      console.log(payloadData, '!@#!@#')
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
        roomId: 1,
        status: 'MESSAGE'
      }
      stompClient.send('/pub/chat/message/', {}, JSON.stringify(chatMessage))
      setUserData({ ...userData, "message": "" })
      console.log(stompClient)
      console.log(userData, '123')
    }
  }
  return (
    <div>
      <button onClick={getAxios}>GetName</button>
      <h1>{userData.username}</h1>
      <input type="text" name="message" placeholder={'enter message'} value={userData.message} onChange={handleValue} />
      <button onClick={sendPublicMessage}> send </button>
      <ul>
        {chats.map(chat => {
          return (
            <li key={userData.userId}>{chat.message}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default ChatTest;