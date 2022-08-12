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
      url: '/admin/users/0',
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


  function userCheck(e) {
    console.log(e)
    if (e.role === 'ROLE_USER') {
      userBan(e)
    } else if (e.role === 'ROLE_SUSPENDED') {
      BanCancle(e)
    }
  }
  function userBan(e) {
    if (e.role === 'ROLE_USER') {
      axios({
        url: '/admin/users/suspend/' + e.id,
        method: 'patch',  
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res)
          reLoad()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  function reLoad(){
    axios({
      url: '/admin/users/0',
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        setUserList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    
  }
  function BanCancle(e) {
    console.log(e)
    if (e.role === 'ROLE_SUSPENDED') {
      axios({
        url: '/admin/users/recover/' + e.id,
        method: 'patch',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res)
          reLoad()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  const userTag = [];
  if (userList && userList.content.length > 0) {
    console.log(userList.content)
    for (let i = 0; i < userList.content.length; i++) {
      let user = null
      const t = userList.content[i]
      let Banbutton = null;
      if (t.role === 'ROLE_USER') {
        Banbutton = <button className='managementButton' onClick={e => userCheck(t)}>정지</button>
        user = <li className='managementUser' id={t.id}>
                <p style={{ marginBottom: '0' }}>{t.userid}({t.username})</p>
                <div className='d-flex'>
                  {Banbutton}
                  <button className='managementButton' onClick={e=>deleteUser(t)}>탈퇴</button>
                </div>
                
              </li>
      } else if (t.role === 'ROLE_SUSPENDED'){
        Banbutton = <button className='managementButton' onClick={e => userCheck(t)}>해제</button>
        user = <li className='managementUserBan' id={t.id}>
                <p style={{ marginBottom: '0' }}>{t.userid}({t.username})</p>
                <div className='d-flex'>
                  {Banbutton}
                  <button className='managementButton' onClick={e=>deleteUser(t)}>탈퇴</button>
                </div>
              </li>
      } else if (t.role === 'ROLE_ADMIN'){
        user = <li className='managementUserAdmin' id={t.id}>
                <p style={{ marginBottom: '0' }}>{t.userid}({t.username})</p>
                <p style={{ marginBottom: '0' }}>관리자</p>
              </li>
      }
      userTag.push(user)
    }
  }

  function deleteUser(e){
    console.log(e)
    if (window.confirm(`정말로 ${e.userid}(${e.username})님의 계정을 삭제하시겠습니까?`)){
      axios({
        url: '/admin/users/'+e.id,
        method: 'patch',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res)
          document.getElementById(e.id).className = 'deleted'
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

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
            {userTag}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ManagementModal;