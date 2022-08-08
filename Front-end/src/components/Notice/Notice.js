import '../components.css'
import NoticeTest from './test.js'
import axios from 'axios'

function Notice() {
    const readlis = []
    const lis = []

    axios({
      url:'/api/notices' ,
      method: 'get',
      params: { page : 0}   // 10페이지정도 불러오도록
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })



    const noticedata = [
        { id:1, title:'공지사항 테스트 데이터 1', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 25일 10시 30분', read:1},
        { id:2, title:'공지사항 테스트 데이터 2', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 25일 16시 30분', read:1},
        { id:3, title:'공지사항 테스트 데이터 3', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 26일 05시 30분', read:1},
        { id:4, title:'공지사항 테스트 데이터 4', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 26일 07시 30분', read:1},
        { id:5, title:'공지사항 테스트 데이터 5', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 26일 08시 30분', read:1},
        { id:6, title:'공지사항 테스트 데이터 6', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 26일 09시 30분', read:1},
        { id:7, title:'공지사항 테스트 데이터 7', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 26일 10시 30분', read:0},
        { id:8, title:'공지사항 테스트 데이터 8', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 26일 13시 30분', read:0},
        { id:9, title:'공지사항 테스트 데이터 9', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 26일 16시 30분', read:0},
        { id:10, title:'공지사항 테스트 데이터 10', content:'안녕하세요. 쏠쏠 개발팀입니다. @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', time:'2022년 7월 26일 16시 30분', read:0},
    ]
    function deleteArticle(e){
      console.log(e)
      axios({
        url:'/api/notices/' ,
        method: 'delete',
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

      
    }
    for (let i=noticedata.length-1; 0<=i; i--) {
        let t = noticedata[i]
        let content = null
        if (t.read) {
            content = <h5 className='read'>{t.title}</h5>
        } else {
            content = <h5>{t.title}</h5>
        }

        let noticeTag = 
          <li className='Article' onClick={e => clickNotice(e)} key={t.id}>
            <div className='noticeTitle'>{ content }
              <span className='articleSpan'>{t.time}</span>
            </div>
            <div className='hide'>
              <p >{t.content}</p>
              <button onClick={e => deleteArticle(t.id)}>DLETE</button>
            </div>
            
          </li>
        lis.push(noticeTag)
    }

    function clickNotice(e){ //읽음으로 바꾸는 axios 추가 안읽은것을 선택하면 title이 투명해져야함
        e.stopPropagation();
        let selectedli = e.currentTarget
        if (selectedli.lastChild.className ==='overText') {
          selectedli.lastChild.className = 'hide'
        } else {
          selectedli.lastChild.className ='overText'
        }
        
    }

  return (
    <div>
      <div className="articles">
      <NoticeTest></NoticeTest>
        {lis}
        {readlis}
      </div> 
    </div>
  )
}

export default Notice;