import React, { useEffect } from 'react';
import { useState } from "react"
// import ChatRoom from '../Modals/ChatRoom'
// import { useNavigate } from 'react-router-dom';
import '../components.css'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { LinearProgress, Stack } from '@mui/material';

function Chat() {
  const [roomOut, setRoomOut] = useState(false)
  const [roomList, setRoomList] = useState([])
  const [loading, setLoading] = useState(false);

  const Loading = () => {
    return (
      < >
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      </>
    );
  };

  let store = useSelector((state) => { return state })
  let navigate = useNavigate()
  useEffect(() => {
    setLoading(true)
    const getRoomList = () => {
      axios({
        url: '/api/room',
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res.data, '방')
          setRoomList(res.data.reverse())
          setLoading(false)

        })
        .catch(err => {
          console.log(err)
        })
    }
    getRoomList()
  }, [roomOut])

  // let navigate = useNavigate()

  const exitRoom = (you, me) => {
    let exitRoomId = null
    roomList.map((room) => {

      if (room.buyer.nickname === you && room.seller.nickname === me) {
        exitRoomId = room.roomId
      } else if (room.buyer.nickname === me && room.seller.nickname === you) {
        exitRoomId = room.roomId
      }
    })
    if (window.confirm("대화방을 나가시겠습니까?")) {
      axios({
        url: `/api/room/${exitRoomId}`,
        method: 'delete',
        headers: { Authorization: `Bearer ${localStorage.token}` }

      })
        .then(res => {
          setRoomOut(!roomOut)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  const ShowChat = () => {
    // filterProduct("women's clothing")
    return (
      <>
        {roomList.map((room, idx) => {
          let you = null;
          let yourImg = null;
          let me = null;
          let yourId = null;
          let myId = null;
          let yourPk = null;

          if (store.info.info.userId === room.buyer.userid) {
            you = room.seller.nickname
            yourImg = room.seller.profileUrl
            me = room.buyer.nickname
            yourId = room.seller.userid
            yourPk = room.seller.id
            myId = room.buyer.userid
          } else {
            you = room.buyer.nickname
            yourImg = room.buyer.profileUrl
            me = room.seller.nickname
            yourId = room.buyer.userid
            myId = room.seller.userid
            yourPk = room.buyer.id
          }
          if (room.buyerOut === 1 || room.sellerOut === 1) {
            return (
              <span className='chat_room' key={idx} style={{ cursor: 'pointer' }} >
                <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => {
                  navigate('/chatroom/' + room.roomId, { state: { roomId: room.roomId, me: me, you: you, yourId: yourId, myId: myId, sellerid: room.seller.userid, yourPk: yourPk } })
                }}>
                  <div className="profile_box" style={{ background: '#BDBDBD' }}>
                    <img className="profile_img" src={'https://i7c110.p.ssafy.io' + yourImg} alt='profileImg' />
                  </div>

                  <div>
                    <h6 className='profile_text'>{you}</h6><br />
                    <div className='profile_text'>상대방이 대화방을 나갔습니다</div>
                  </div>
                </div>
                <div>
                  <div className='message_info'>
                    {/* <p className='message_time'>{room.time}</p> */}
                    <div style={{ display: 'flex' }}>
                      <div className='unread_message'>
                        <p>!</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ cursor: 'pointer', width: '27px', height: '27px', marginLeft: '10px', color: '#6667AB' }} onClick={() => { exitRoom(you, me) }} />

                      {/* <button className='submitbutton-able' style={{ borderRadius: '10px', marginLeft: '7px' }} onClick={() => { exitRoom(you, me) }}>방 나가기</button> */}
                    </div>
                  </div>
                </div>
              </span>
            );
          } else if (room.buyerOut === 0 && room.sellerOut === 0) {
            return (
              <span className='chat_room' key={idx} style={{ cursor: 'pointer' }} >
                <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => {
                  navigate('/chatroom/' + room.roomId, {
                    state:
                    {
                      roomId: room.roomId,
                      me: me,
                      you: you,
                      yourId: yourId,
                      myId: myId,
                      sellerid: room.seller.userid,
                      yourPk: yourPk
                    }
                  })
                }}>
                  <div className="profile_box" style={{ background: '#BDBDBD' }}>
                    <img className="profile_img" src={'https://i7c110.p.ssafy.io' + yourImg} alt='profileImg' />
                  </div>

                  <div>
                    <h6 className='profile_text'>{you}</h6><br />
                    <div className='profile_text'>{room.lastMessage}.</div>
                  </div>
                </div>
                <div>
                  {room.isRead === 1 ? <div className='message_info'>
                    {/* <p className='message_time'>{room.time}</p> */}
                    <div style={{ display: 'flex' }}>
                      <div className='unread_message'>
                        <p>!</p>
                      </div>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ cursor: 'pointer', width: '27px', height: '27px', marginLeft: '10px', color: '#6667AB' }} onClick={() => { exitRoom(you, me) }} />
                      {/* <button className='submitbutton-able' style={{ borderRadius: '10px', marginLeft: '7px' }} onClick={() => { exitRoom(you, me) }}>방 나가기</button> */}
                    </div>
                  </div>
                    :
                    <div className='message_info'>
                      {/* <p className='message_time'>{room.time}</p> */}
                      <div style={{ display: 'flex' }}>
                        {/* <div className='unread_message'> */}
                        {/* <p></p> */}
                        {/* </div> */}
                        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ cursor: 'pointer', width: '27px', height: '27px', marginLeft: '10px', color: '#6667AB' }} onClick={() => { exitRoom(you, me) }} />
                        {/* <button className='submitbutton-able' style={{ borderRadius: '10px', marginLeft: '7px' }} onClick={() => { exitRoom(you, me) }}>방 나가기</button> */}
                      </div>
                    </div>
                  }

                </div>
              </span>)
          }

        })}
      </>
    );

  };


  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '40px' }}>{store.info.info.userId}의 채팅방</h2>
      <ul style={{ padding: '0' }}>
        {loading ? <Loading /> : <ShowChat />}
      </ul>
    </>
  );
}

export default Chat;
