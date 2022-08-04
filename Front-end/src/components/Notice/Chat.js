import React from 'react';
import { useState } from "react"
// import ChatRoom from '../Modals/ChatRoom'
import { useNavigate } from 'react-router-dom';

function Chat() {

  let navigate = useNavigate()


  const data = [
    { id: 1, buyer: 'buyer 1', thumbnail: 'https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg', text: '안녕하세유', time: '2022-08-03 pm 09:56' },
    { id: 2, buyer: 'buyer 2', thumbnail: 'https://post-phinf.pstatic.net/MjAyMDAyMjJfMSAg/MDAxNTgyMzY1NzE3MzEw.GsKJMsvSf2CnkhZQ4eTSGD8m3DS5QLUJNKPs3P97vW0g.ca3xreRCcA2dmsA73cDuVU8c15vaQaPbjANR-ykoYDog.JPEG/%ED%96%84%EC%8A%A4%ED%84%B05.jpg?type=w1200', text: 'Zzz...', time: '2022-08-03 pm 09:56' },
    { id: 3, buyer: 'buyer 3', thumbnail: 'https://pds.joongang.co.kr/news/FbMetaImage/202203/96548fe5-a590-41ea-9233-262ee6774a4f.png', text: '반갑습니다', time: '2022-08-03 pm 09:56' },
    { id: 4, buyer: 'buyer 4', thumbnail: 'https://img.seoul.co.kr/img/upload/2021/05/03/SSI_20210503113234_O2.jpg', text: '하이하이', time: '2022-08-03 pm 09:56' },
    { id: 5, buyer: 'buyer 5', thumbnail: 'https://blog.kakaocdn.net/dn/5hzaw/btqDqiXDHo6/gtyyKVxoQbDgzJuzMMzDYk/img.jpg', text: '졸립니다', time: '2022-08-03 pm 09:56' },
  ]
  const [roomLists] = useState(data)
  const [userName] = useState('hoho')

  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '40px' }}>{userName}의 채팅방</h2>
      <ul>
        {roomLists.map((roomList) =>
          // 버튼 클릭 시 방 세션으로 넘어가기 (A-1, A-2, A-3, ...) 만약 없으면 새로운 방 생성?
          <li className='chat_room' key={roomList.id} style={{ cursor: 'pointer' }} onClick={() => {
            navigate('/chatRoom')
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="profile_box" style={{ background: '#BDBDBD' }}>
                <img className="profile_img" src={roomList.thumbnail} alt='profileImg' />
              </div>

              <div>
                <h6 className='profile_text'>{roomList.buyer}</h6>
                <p className='profile_text'>{roomList.text}</p>
              </div>
            </div>
            <div>
              <div className='message_info'>
                <p>{roomList.time}</p>

                <div className='not_read_message'>
                  <p style={{ color: 'white', marginLeft: 'auto', textAlign: 'center' }}>2</p>
                </div>
              </div>
            </div>

          </li>
        )}
      </ul>
    </>
  );
}

export default Chat;