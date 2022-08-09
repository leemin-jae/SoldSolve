import React, { useEffect } from 'react';
import { useState } from "react"
// import ChatRoom from '../Modals/ChatRoom'
// import { useNavigate } from 'react-router-dom';
import ModalChat from '../Modals/ModalChat';
import '../components.css'
import axios from 'axios';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useSelector } from 'react-redux'



let stompClient = null;

function Chat() {
  const [roomList, setRoomList] = useState([])
  let store = useSelector((state) => { return state })

  useEffect(() => {
    console.log('연결중')
    let Sock = new SockJS('/ws-stomp');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);

    return () => {
      if (stompClient.connected) stompClient.disconnect();
    };
  }, [roomList])

  const onError = err => {
    console.log(err);
    throw err;
  };

  const onConnected = () => {
    roomList.map((room, idx) => {
      console.log(idx, '연결완료')
      stompClient.subscribe(`/topic/chat/room/${room.roomId}`);

    })
  };

  useEffect(() => {
    const getRoomList = () => {
      axios({
        url: '/api/room',
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          setRoomList(res.data)
          console.log(roomList)
        })
        .catch(err => {
          console.log(err)
        })
    }

    getRoomList()
  }, [])


  console.log(roomList)
  const [buyerName, setBuyerName] = useState('')

  // let navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (buyerName) => {
    // console.log(e)
    setBuyerName(buyerName)
    setModalOpen(true);
    // console.log(buyerName)

  };
  const closeModal = () => {
    setModalOpen(false);
    console.log(modalOpen)

  };


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
    console.log(buyerName)
    console.log(stompClient)
    return (
      <>
        {roomList.map((room) => {
          return (
            <span className='chat_room' key={room.roomId} style={{ cursor: 'pointer' }} >
              <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => {
                // setBuyerName()
                openModal(room.seller.nickname)
              }}>
                <div className="profile_box" style={{ background: '#BDBDBD' }}>
                  <img className="profile_img" src={room.profileUrl} alt='profileImg' />
                </div>

                <div>
                  <h6 className='profile_text'>{room.seller.nickname}</h6><br />
                  <div className='profile_text'>{room.seller.email}</div>
                </div>
              </div>
              <div>
                <div className='message_info'>
                  {/* <p className='message_time'>{room.time}</p> */}
                  <div className='unread_message'>
                    <p>2</p>
                  </div>
                </div>
              </div>
              {console.log(room.roomId)}
              <ModalChat open={modalOpen} close={closeModal} header={buyerName} seller={room.seller.nickname} buyer={room.buyer.nickname} me={store.info.info.userId} roomId={room.roomId} stompClient={stompClient}>
              </ModalChat>
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
    </>
  );
}

export default Chat;
