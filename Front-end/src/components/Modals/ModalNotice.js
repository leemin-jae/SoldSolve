import React from 'react';
import './modal.css';
import axios from 'axios';
import { useState,useEffect } from "react"


const ModalNotice = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  
  useEffect(()=>{

    axios({
      url:'/api/notices/'+header ,
      method: 'get',
    })
    .then(res => {
      console.log(res.data)
      console.log(document.getElementsByClassName('NoticeModal_title')[0].value = res.data.title)
      console.log(document.getElementsByClassName('NoticeModal_content')[0].value = res.data.content)
      setTitle(res.data.title)
      setContent(res.data.content)
    })
    .catch(err => {
      console.log(err)
    })
  },[open])


  function submitForm(e) {
    e.preventDefault();
    if (header !== 0) {
      axios({
        url:'/api/notices' ,
        method: 'post',
        data : { title:title, content:content}
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      axios({
        url:'/api/notices/'+header ,
        method: 'patch',
        data : { title:title, content:content}
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
    
  }

  function textInput(e) {
    console.log(e.target.name)
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    } else {
      setContent(e.target.value)
    }

  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            <p>공지사항 관리</p>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <label>Title</label>
            <input name="title" onChange={e=>textInput(e)} className='NoticeModal_title' type="text"></input>
            <label>Content</label>
            <textarea name="content" onChange={e=>textInput(e)} className='NoticeModal_content'></textarea>
          </main>
          <footer>
          <button className="close mx-2" onClick={e => submitForm(e)}>작성하기</button>
          <button className="close mx-2" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalNotice;