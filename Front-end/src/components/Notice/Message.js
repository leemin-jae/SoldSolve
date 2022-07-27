import '../components.css'

function Message() {
    const readlis = []
    const lis = []
    const messagedata = [
      { title:'메세지함 테스트 데이터 1', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 25일 10시 30분', read:1},
      { title:'메세지함 테스트 데이터 2', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 10시 30분', read:1},
      { title:'메세지함 테스트 데이터 3', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 13시 30분', read:1},
      { title:'메세지함 테스트 데이터 4', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 16시 30분', read:1},
      { title:'메세지함 테스트 데이터 5', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 16시 30분', read:1},
      { title:'메세지함 테스트 데이터 6', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 16시 30분', read:1},
      { title:'메세지함 테스트 데이터 7', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 16시 30분', read:1},
      { title:'메세지함 테스트 데이터 8', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 16시 30분', read:0},
      { title:'메세지함 테스트 데이터 9', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 16시 30분', read:0},
      { title:'메세지함 테스트 데이터 10', content:'좋아요를 눌렀던 @@@@ 상품의 라이브가 @@일 @@시 @@분에 시작될 예정입니다.', time:'2022년 7월 26일 16시 30분', read:0},
  ]

    for (let i=messagedata.length-1; 0<=i; i--) {
        let t = messagedata[i]
        let content = null
        if (t.read) {
            content = <h5 className='read'>{t.title}</h5>
        } else {
            content = <h5>{t.title}</h5>
        }

        let noticeTag = <li className='Article' onClick={e => clickNotice(e)} key={t.id}><div className='noticeTitle'>{ content }<span className='articleSpan'>{t.time}</span></div><p className='hide'>{t.content}</p></li>
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
        {lis}
        {readlis}
      </div> 
    </div>
  )
}

export default Message;