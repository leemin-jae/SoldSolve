import '../components.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ModalNotice from '../Modals/ModalNotice'


function Notice() {
  const lis = []
  const [noticeData, setNoticeData] = useState('')
  useEffect(() => {
    axios({
      url: '/api/notices',
      method: 'get',
      params: { page: 0 }
    })
      .then(res => {
        console.log(res)
        console.log(res.data.content)
        setNoticeData(res.data.content)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  function deleteArticle(e) {
    console.log(e)
    axios({
      url: '/api/notices/' + e,
      method: 'delete',
    })
      .then(res => {
        console.log(res)
        window.location.href='/notice'
      })
      .catch(err => {
        console.log(err)
      })
  }


  for (let i = 0; i < noticeData.length; i++) {
    let t = noticeData[i]


    let noticeTag =
      <li className='Article' id={t.id} onClick={e => clickNotice(e)} key={t.id}>
        <div className='noticeTitle'>
        <h6>{t.title}</h6>
          <span className='articleSpan'>{t.writtenTimes}</span>
        </div>
        <div className='hide' id={'ArticleContent' + t.id}>
          <p className='article_line'>{t.content}</p>
          
          <div className='d-flex justify-content-end'>
            <button onClick={e => updateButton(t.id)} className='noticeButton'>UPDATE</button>
            <button onClick={e => deleteArticle(t.id)} className='noticeButton'>DLETE</button>
          </div>
        </div>
      </li>
    lis.push(noticeTag)
  }

  function clickNotice(e) { //읽음으로 바꾸는 axios 추가 안읽은것을 선택하면 title이 투명해져야함
    e.stopPropagation();
    if (document.getElementById('ArticleContent' + e.currentTarget.id).classList.value === 'overText') {
      document.getElementById('ArticleContent' + e.currentTarget.id).classList = 'hide'
    } else if (document.getElementById('ArticleContent' + e.currentTarget.id).classList.value === 'hide') {
      document.getElementById('ArticleContent' + e.currentTarget.id).classList = 'overText'
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode,setModalMode] = useState(0)


  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    console.log(1234)
    window.location.href='/notice'
  };

  function createButton(e) {
    e.preventDefault();
    setModalMode(0)
    openModal()
  }
  function updateButton(e) {
    setModalMode(e)
    openModal()
  }

  return (
    <div>
      <div className="articles">
        <button className='noticeButton my-1 d-flex justify-content-end' onClick={e=>createButton(e)}>공지사항 작성하기</button>
        {lis}
      </div>
      <ModalNotice open={modalOpen} close={closeModal} header={modalMode}>
        판매내역리스트
      </ModalNotice>
    </div>

  )
}

export default Notice;