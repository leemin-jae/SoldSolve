import React, { useEffect } from 'react';
import './modal.css';
import axios from 'axios';
import { useState } from 'react';
const ManagementModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close } = props;
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    axios({
      url: 'http://i7c110.p.ssafy.io:8080/admin/users/0',
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        setUserList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [open])

  console.log(userList)
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <div className='scoreModal'>

          <div className='scoreTop'>
            <h3>유저 관리</h3>
            <button className="close closeButton" onClick={close}>&times;</button>
          </div>
          <div className='managementMain'>
            {userList && userList.content.map((user) => {
              return (
                <li className='managementUser'>
                  <p style={{ marginBottom: '0' }}>{user.username}</p>
                  <button className='managementButton'>정지&해제</button>
                  <button className='managementButton'>탈퇴</button>
                </li>
              )

            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ManagementModal;