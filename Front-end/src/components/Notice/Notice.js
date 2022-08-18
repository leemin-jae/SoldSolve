import '../components.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ModalNotice from '../Modals/ModalNotice'
import { useSelector } from 'react-redux'


function Notice() {
  const lis = []
  const [noticeData, setNoticeData] = useState('')
  let storeToken = useSelector((state) => { return state })

  useEffect(() => {
    axios({
      url: '/api/notices',
      method: 'get'
    })
      .then(res => {
        setNoticeData(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  function deleteArticle(e) {
    axios({
      url: '/admin/notices/' + e,
      method: 'delete',
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        window.location.href = '/notice'
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
          <p style={{ marginBottom:'0' }}>{t.title}</p>
          <span className='articleSpan'>{t.writtenTimes.slice(0,4)}년{t.writtenTimes.slice(5,7)}월{t.writtenTimes.slice(8,10)}일</span>
        </div>
        <div className='hide' id={'ArticleContent' + t.id}>
          <p className='article_line'>{t.content}</p>
          {storeToken.info.info.role === 'ROLE_ADMIN' ?
            <div className='d-flex justify-content-end'>
              <button onClick={e => updateButton(t.id)} className='noticeButton'>UPDATE</button>
              <button onClick={e => deleteArticle(t.id)} className='noticeButton'>DLETE</button>
            </div>
            : null}
        </div>
      </li>
    lis.push(noticeTag)
  }

  function clickNotice(e) {
    e.stopPropagation();
    if (document.getElementById('ArticleContent' + e.currentTarget.id).classList.value === 'overText') {
      document.getElementById('ArticleContent' + e.currentTarget.id).classList = 'hide'
    } else if (document.getElementById('ArticleContent' + e.currentTarget.id).classList.value === 'hide') {
      document.getElementById('ArticleContent' + e.currentTarget.id).classList = 'overText'
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(0)


  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    window.location.href = '/notice'
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
      <div className="noticeTab">
        {storeToken.info.info.role === 'ROLE_ADMIN' ?
          <div className='d-flex justify-content-end'>
            <button className='noticeButton my-1 d-flex justify-content-end' onClick={e => createButton(e)}>공지사항 작성하기</button>
          </div>
          : null}
        <div className='articles'>
          {lis}
        </div>

      </div>
      <ModalNotice open={modalOpen} close={closeModal} header={modalMode}>
        판매내역리스트
      </ModalNotice>
    </div>

  )
}

export default Notice;