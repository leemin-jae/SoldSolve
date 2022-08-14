import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import { useParams } from 'react-router-dom';
import axios from "axios"
import { useSelector } from 'react-redux'


function CreateRoom() {
  let store = useSelector((state) => { return state })

  const [button, setButton] = useState('noInput')
  const [roomName, setRoomName] = useState(null)
  const [description, setDescription] = useState(null)
  const productid = useParams().id;
  const [productData, setProductData] = useState(null);
  const [money, setMoney] = useState('')
  const [category, setCategory] = useState('');
  let submitButton = null;
  if (button === 'noInput') {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  } else if (button === 'input') {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  }

  useEffect(() => {
    if (productid) {
      axios({
        url: `/api/product/${productid}`,
        method: 'get',
      })
        .then(res => {
          if (store.info.info.userId !== res.data.user.userid) {
            alert("잘못된 접근입니다!.")
            window.location.href = '/'
          }
          setProductData(res.data)
          // document.getElementsByName('roomTitle')[0].value = res.data.title
          let value = res.data.price;
          const formatValue = value.toLocaleString('ko-KR');
          setMoney(formatValue)
          setRoomName(res.data.title)
          setDescription(res.data.content)
          changeCategory(res.data.category)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [productid])

  function changeCategory(e) {
    if (e === 'digital') {
      setCategory('디지털기기')
    } else if (e === 'appliances') {
      setCategory('생활가전')
    } else if (e === 'furniture') {
      setCategory('가구')
    } else if (e === 'fashion') {
      setCategory('패션/잡화')
    } else if (e === 'beauty') {
      setCategory('뷰티/미용')
    } else if (e === 'sports') {
      setCategory('스포츠')
    } else if (e === 'games') {
      setCategory('취미/게임')
    } else if (e === 'book') {
      setCategory('도서')
    } else {
      setCategory('기타')
    }
  }

  function inputForm(e) {
    if (e.target.name === 'roomTitle') {
      setRoomName(e.target.value)
      if (e.target.value && roomName && description) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }
    else if (e.target.name === 'roomContent') {
      setDescription(e.target.value)

      if (e.target.value && roomName && description) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }
  }

  const OPENVIDU_SERVER_URL = 'https://i7c110.p.ssafy.io:8443';
  const OPENVIDU_SERVER_SECRET = 'SOLDSOLVE';

  function createSession(sessionId) {
    var data = JSON.stringify({ customSessionId: 'sell' + sessionId });
    axios
      .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('CREATE SESION', response);
        console.log(response.data.id)
        createSessionDB()

      })
      .catch(err => {
        if (err.response.status === 409) {
          document.location.href = `/live/${productData.user.userid}/sell${productid}`
        }
      })
  }

  function createSessionDB() {
    const sessionData = {
      sessionId: 'sell' + productid,
      title: roomName,
      content: description,
      productNo: productid,
    }
    axios({
      url: '/api/live',
      method: 'post',
      data: sessionData,
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then((res) => {
        console.log(res)
        document.location.href = `/live/${productData.user.userid}/sell${productid}`
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function goLive(e) {
    e.preventDefault();
    localStorage.setItem('LiveRoom', roomName)
    createSession(productid)
  }

  return (
    <>
      <div>
        <NavBar></NavBar>
        <div>
          {productData ? <div className="test">
            <div className="test3">
              <h1 className="my-5">CREATE ROOM</h1>
              <form onSubmit={e => goLive(e)}>
                <div className="pform" name="category" style={{ marginTop: '10px', marginBottom: '15px', backgroundColor: '#cacbdbb2' }}>
                  <p style={{ height: '53px', margin: 0, padding: '15px' }}>{category}</p>
                </div>
                <div className="pform" name="price" style={{ marginTop: '20px', marginBottom: '10px', backgroundColor: '#cacbdbb2' }}>
                  <p style={{ height: '53px', margin: 0, padding: '15px' }}>{money} 원</p>
                </div>
                <input onChange={e => { inputForm(e) }} className="inputform" name="roomTitle" id="roomTitle" type="text" placeholder="방 제목"></input>
                <div>
                  <textarea onChange={e => { inputForm(e) }} className="descriptionform" name="roomContent" id="roomContent" placeholder="설명">{productData.content}</textarea>
                </div>
                {submitButton}
              </form>
            </div>
          </div> : null}

        </div>
      </div>
    </>
  )
}

export default CreateRoom