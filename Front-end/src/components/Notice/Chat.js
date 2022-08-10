import React, { useEffect } from 'react';
import { useState } from "react"
// import ChatRoom from '../Modals/ChatRoom'
// import { useNavigate } from 'react-router-dom';
import ModalChat from '../Modals/ModalChat';
import '../components.css'
import axios from 'axios';
import { useSelector } from 'react-redux'

function Chat() {
  const [roomList, setRoomList] = useState([])
  let store = useSelector((state) => { return state })
  console.log(store.info.info.nickName, '사용자이름')

  useEffect(() => {
    // const currentUserName = store.info.info.nickname
    // console.log(currentUserName, '이름이름')
    const getRoomList = () => {
      axios({
        url: '/api/room',
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          // console.log(res, '!!!')
          setRoomList(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    getRoomList()
  }, [])

  // let navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false);
  const [selectChat, setSelectChat] = useState(null);
  const openModal = (room) => {
    setSelectChat(room)
    setModalOpen(true);

  };
  const closeModal = () => {
    setModalOpen(false);
    console.log(modalOpen)

  };

  const exitRoom = (you, other) => {
    let exitRoomId = null
    roomList.map((room) => {
      if (room.buyer.nickname == you && room.seller.nickname == other) {
        exitRoomId = room.roomId
      } else if (room.buyer.nickname == other && room.seller.nickname == you) {
        exitRoomId = room.roomId
      }
    })
    console.log(exitRoomId, '!@!!ASDFASD')
    if (window.confirm("대화방을 나가시겠습니까?")) {
      axios({
        url: `/api/room/${exitRoomId}`,
        method: 'delete',

      })
        .then(res => {
          console.log(res.data.message)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  // const data = [
  //   { id: 1, buyer: 'buyer 1', thumbnail: 'https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg', text: '안녕하세유', time: '22/08/03 pm 09:56' },
  //   { id: 2, buyer: 'buyer 2', thumbnail: 'https://post-phinf.pstatic.net/MjAyMDAyMjJfMSAg/MDAxNTgyMzY1NzE3MzEw.GsKJMsvSf2CnkhZQ4eTSGD8m3DS5QLUJNKPs3P97vW0g.ca3xreRCcA2dmsA73cDuVU8c15vaQaPbjANR-ykoYDog.JPEG/%ED%96%84%EC%8A%A4%ED%84%B05.jpg?type=w1200', text: '가나다라', time: '22/08/03 pm 09:56' },
  //   { id: 3, buyer: 'buyer 3', thumbnail: 'https://pds.joongang.co.kr/news/FbMetaImage/202203/96548fe5-a590-41ea-9233-262ee6774a4f.png', text: '반갑습니다', time: '22/08/03 pm 09:56' },
  //   { id: 4, buyer: 'buyer 4', thumbnail: 'https://img.seoul.co.kr/img/upload/2021/05/03/SSI_20210503113234_O2.jpg', text: '하이하이', time: '22/08/03 pm 09:56' },
  //   { id: 5, buyer: 'buyer 5', thumbnail: 'https://blog.kakaocdn.net/dn/5hzaw/btqDqiXDHo6/gtyyKVxoQbDgzJuzMMzDYk/img.jpg', text: '졸립니다', time: '22/08/03 pm 09:56' },
  // ]
  // const [roomLists] = useState(data)
  // const [userName] = useState('hoho')

  const ShowChat = () => {
    // filterProduct("women's clothing")
    return (
      <>
        {roomList.map((room, idx) => {
          let you = null;
          let yourImg = null;
          let yourEmail = null;
          let other = null

          if (store.info.info.userId === room.buyer.userid) {
            you = room.seller.nickname
            yourImg = room.seller.profileUrl
            yourEmail = room.seller.email
            other = room.buyer.nickname
          } else {
            you = room.buyer.nickname
            yourImg = room.buyer.profileUrl
            yourEmail = room.buyer.email
            other = room.seller.nickname
          }

          return (
            <span className='chat_room' key={idx} style={{ cursor: 'pointer' }} >
              <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => {
                // setBuyerName()
                openModal(room)
              }}>
                <div className="profile_box" style={{ background: '#BDBDBD' }}>
                  <img className="profile_img" src={'https://i7c110.p.ssafy.io' + yourImg} alt='profileImg' />
                </div>

                <div>
                  <h6 className='profile_text'>{you}</h6><br />
                  <div className='profile_text'>{yourEmail}</div>
                </div>
              </div>
              <div>
                <div className='message_info'>
                  {/* <p className='message_time'>{room.time}</p> */}
                  <div style={{ display: 'flex' }}>
                    <div className='unread_message'>
                      <p>2</p>
                    </div>
                    <button className='submitbutton-able' style={{ borderRadius: '10px', marginLeft: '7px' }} onClick={() => { exitRoom(you, other) }}>방 나가기</button>
                  </div>
                </div>
              </div>
            </span>
          );
        })}
      </>
    );

  };


  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '40px' }}>{store.info.info.userId}의 채팅방</h2>
      <ul style={{ padding: '0' }}>
        {<ShowChat />}
      </ul>
      <ModalChat open={modalOpen} close={closeModal} header={selectChat}></ModalChat>
    </>
  );
}

export default Chat;
