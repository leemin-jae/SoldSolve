import { useEffect,useState } from "react"
import NavBar from "../components/NavBar"
import { useParams } from 'react-router-dom';
import axios from "axios"

function CreateRoom() {

  let [timeState, setTimeState] = useState(0)
  const [button, setButton] = useState('noInput')
  const [roomName, setRoomName] = useState(null)
  const [description, setDescription] = useState(null)
  const [time, setTime] = useState('')
  const productid = useParams().id;
  const [productData, setProductData] = useState(null);
  const [money,setMoney] = useState('')
  let submitButton = null;
  if (button === 'noInput') {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  } else if (button === 'input') {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  }

  useEffect(()=>{
    if (productid) {
      axios({
      url: `/api/product/${productid}`,
      method: 'get',
      })
      .then(res => {
        console.log(res)
        setProductData(res.data)
        // document.getElementsByName('roomTitle')[0].value = res.data.title
        let value = res.data.price;
        const formatValue = value.toLocaleString('ko-KR');
        setMoney(formatValue)
        setRoomName(res.data.title)
        setDescription(res.data.content)
      })
      .catch(err => {
        console.error(err)
      })
    }
  },[productid])

  function inputForm(e) {

    if (e.target.name === 'time') {
      setTime(e.target.value)
      if (e.target.value && time && roomName && description) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }

    else if (e.target.name === 'roomTitle') {
      setRoomName(e.target.value)
      if (e.target.value && time && roomName && description) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }
    else if (e.target.name === 'roomContent') {
      setDescription(e.target.value)

      if (e.target.value && time && roomName && description) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }
  }

  const OPENVIDU_SERVER_URL = 'https://i7c110.p.ssafy.io:8443';
  const OPENVIDU_SERVER_SECRET = 'SOLDSOLVE';

  function createSession(sessionId) { 
        var data = JSON.stringify({ customSessionId: 'sell'+sessionId });
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
                document.location.href = `/live/${productData.user.userid}/sell${productid}`
            })
            .catch(err=>{
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
          { productData ? <div className="test">
            <div className="test3">
              <h1 className="my-5">CREATE ROOM</h1>
              <form onSubmit={e=> goLive(e)}>
                <div className="pform" name="category" style={{ marginTop: '10px', marginBottom: '15px' }}>
                  <p style={{ height: '53px', margin: 0, padding: '15px' }}>{productData.category}</p>
                </div>
                <div className="pform" name="price" style={{ marginTop: '20px', marginBottom: '10px' }}>
                  <p style={{ height: '53px', margin: 0, padding: '15px' }}>{money} 원</p>
                </div>
                <input onChange={e => { inputForm(e) }} className="inputform" name="roomTitle" id="roomTitle" type="text" placeholder="방 제목"></input>
                <div>
                  <textarea onChange={e => { inputForm(e) }} className="descriptionform" name="roomContent" id="roomContent" placeholder="설명">{productData.content}</textarea>
                </div>
                <div onClick={() => {
                  setTimeState(1)
                }}>
                  <TimeSet timeState={timeState} inputForm={inputForm}></TimeSet>
                </div>
                {submitButton}
              </form>
            </div>
          </div> : null }
          
        </div>
      </div>
    </>
  )
}

function TimeSet(props) {
  if (props.timeState === 0) {
    return <input disabled className="inputform" type="text" placeholder="방송 시작 시간"></input>
  } else {
    return <input onInput={e => { props.inputForm(e) }} className="inputform inputform2" name="time" type="datetime-local" placeholder="방송 시작 시간"></input>
  }

}

export default CreateRoom