import '../components.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { asyncOnclickMessage } from '../../store'
import { useDispatch } from 'react-redux'

function Message() {
  let dispatch = useDispatch()

  const readlis = []
  const lis = []
  const [messagedata, setMessagedata] = useState('')
  useEffect(() => {
    axios({
      url: '/api/messages',
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        console.log(res)
        setMessagedata(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  for (let i = messagedata.length - 1; 0 <= i; i--) {
    let t = messagedata[i]
    let noticeTag =
      <>
        {t.isRead ?
          <li className='Article read' id={t.id} onClick={e => clickNotice(t)} key={t.id}>
            <div className='noticeTitle'>{t.content}
              <span className='articleSpan'>{t.writtenTimes}</span>
            </div>
          </li>
          :
          <li className='Article' id={t.id} onClick={e => clickNotice(t)} key={t.id}>
            <div className='noticeTitle'>{t.content}
              <span className='articleSpan'>{t.writtenTimes}</span>
            </div>
          </li>}
      </>



    lis.push(noticeTag)
  }

  function clickNotice(e) {
    axios({
      url: '/api/messages/' + e.id,
      method: 'put',
      data: e
    })
      .then(res => {
        console.log(res)
        document.getElementById(e.id).classList.add('read')
        dispatch(asyncOnclickMessage(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className="articles">
        {lis}
        {readlis}
      </div>
    </div>
  )
}

export default Message;