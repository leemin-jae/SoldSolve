import React from 'react';
import { useState } from "react"

function Chat() {

  const data = [
    { id: 1, buyer: 'buyer 1', thumbnail: 'https://images.mypetlife.co.kr/content/uploads/2019/09/09152804/ricky-kharawala-adK3Vu70DEQ-unsplash.jpg' },
    { id: 2, buyer: 'buyer 2', thumbnail: 'https://post-phinf.pstatic.net/MjAyMDAyMjJfMSAg/MDAxNTgyMzY1NzE3MzEw.GsKJMsvSf2CnkhZQ4eTSGD8m3DS5QLUJNKPs3P97vW0g.ca3xreRCcA2dmsA73cDuVU8c15vaQaPbjANR-ykoYDog.JPEG/%ED%96%84%EC%8A%A4%ED%84%B05.jpg?type=w1200' },
    { id: 3, buyer: 'buyer 3', thumbnail: 'https://pds.joongang.co.kr/news/FbMetaImage/202203/96548fe5-a590-41ea-9233-262ee6774a4f.png' },
    { id: 4, buyer: 'buyer 4', thumbnail: 'https://img.seoul.co.kr/img/upload/2021/05/03/SSI_20210503113234_O2.jpg' },
    { id: 5, buyer: 'buyer 5', thumbnail: 'https://blog.kakaocdn.net/dn/5hzaw/btqDqiXDHo6/gtyyKVxoQbDgzJuzMMzDYk/img.jpg' },
  ]
  const [roomLists, setRoomLists] = useState(data)
  const [userName] = useState('hoho')
  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '40px' }}>{userName}의 채팅방</h2>
      <ul>
        {roomLists.map((roomList) =>
          <li className='chat_room' key={roomList.id}>
            <div className="profile_box" style={{ background: '#BDBDBD' }}>
              <img className="profile_img" src={`${roomList.thumbnail}`} alt='profileImg' />
            </div>
            <div className='profile_text'>
              <h6>{roomList.buyer}</h6>
              <p>ㅎㅇㅎㅇ</p>

            </div>
          </li>
        )}
      </ul>
    </>
  );
}

export default Chat;