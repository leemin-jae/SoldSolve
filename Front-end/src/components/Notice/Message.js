import '../components.css'
import {useEffect,useState} from 'react'
import axios

from 'axios'
function Message() {
    const readlis = []
    const lis = []
    const [messagedata,setMessagedata] = useState('')
    useEffect(() => {
      axios({
        url: '/api/messages',
        method: 'get',
        headers : { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res)
          setMessagedata(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }, [])


    for (let i=messagedata.length-1; 0<=i; i--) {
        let t = messagedata[i]
        console.log(t.isRead)
        let noticeTag = 
            <>
            { t.isRead ?
                <li className='Article read' onClick={e => clickNotice(t)} key={t.id}>
                  <div className='noticeTitle'>{ t.content }
                  <span className='articleSpan'>{t.writtenTimes}</span>
                  </div>
                </li>
              :
                <li className='Article' onClick={e => clickNotice(t)} key={t.id}>
                  <div className='noticeTitle'>{ t.content }
                  <span className='articleSpan'>{t.writtenTimes}</span>
                  </div>
                </li> }
            </>
            
             
            
        lis.push(noticeTag)
    }

    function clickNotice(e){ //읽음으로 바꾸는 axios 추가 안읽은것을 선택하면 title이 투명해져야함
      console.log(e)
      axios({
        url: '/api/messages/'+e.id,
        method: 'put',
        data: e
      })
        .then(res => {
          console.log(res)
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