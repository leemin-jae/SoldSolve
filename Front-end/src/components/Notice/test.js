import axios from "axios"
import { useState } from "react"

function NoticeTest() {
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')

  function inputForm(e) {
    if (e.target.id === 'title'){
      setTitle(e.target.value)
    } else {
      setContent(e.target.value)
    }
  }

  function submitForm(e) {
    e.preventDefault();
    console.log(title,content)
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
  }
  

  return (
    <div>
      <form onSubmit={e => submitForm(e)}>
          <input className="form-control" id="title" onChange={e => inputForm(e)} type="text"></input>
          <input className="form-control" id="content" onChange={e => inputForm(e)} type="text"></input>
          <button onClick={e => submitForm(e)} type="submit">제출</button>
      </form>
    </div>
  )
}

export default NoticeTest;