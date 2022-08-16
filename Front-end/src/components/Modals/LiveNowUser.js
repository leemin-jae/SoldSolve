import React, { useEffect, useState } from 'react';
import './modal.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OPENVIDU_SERVER_URL = 'https://i7c110.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'SOLDSOLVE';

const LiveNowUser = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴 헤더에 room데이터 가져와서
  const { open, close, header, sellerid,sellerNick } = props;
  const [nowUser, setNowUser] = useState([])
  let store = useSelector((state) => { return state })

  useEffect(() => {
    axios
      .get(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + header, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        },
      })
      .then((res) => {
        setNowUser(res.data.connections.content)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [open])


  function Kick(e) {
    axios
      .delete(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + header + '/connection/' + e, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let seller =null;
  const userTag = [];
  if (nowUser && nowUser.length > 0) {
    for (let i = 0; i < nowUser.length; i++) {
      let user = null
      const data = nowUser[i].clientData
      const userNick = JSON.parse(data).clientData
      if (store.info.info.nickName === sellerNick) {
        seller = userNick
      } else {
        user =
          <li className='managementUser'>
            <p style={{ marginBottom: '0' }}>{userNick}</p>
            {store.info.info.userId === sellerid ?
              <button className='managementButton' onClick={e => Kick(nowUser[i].connectionId)}>강퇴</button>
              : null}
          </li>
      }
      userTag.push(user)
    }
  }


  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ?
        <div className='offerModal'>
          <div className='scoreTop'>
            <button className="close closeButton" onClick={close}>&times;</button>
          </div>
          <div className='offerMain'>
            <div className='offerTitle' style={{ marginTop: -10 }}>
              <h5>현재 접속 인원</h5>
            </div>
            <div className='nowUserBox'>
              <li className='managementUserAdmin'>
                <p style={{ marginBottom: '0' }}>{seller}</p>
                <p style={{ marginBottom: '0' }}>판매자</p>
              </li>
              {userTag}
            </div>
          </div>
        </div> : null}
    </div>
  );
};

export default LiveNowUser;