import { useState } from "react"
import NavBar from "../components/NavBar"

function CreateRoom() {

  const item =
{
  category_id: '전자제품',
  price: '300,000'

}
  let [timeState, setTimeState] = useState(0)
  const [button, setButton] = useState('noInput')
  const [roomName, setRoomName] = useState(null)
  const [description, setDescription] = useState(null)
  const [time, setTime] = useState('')

  let submitButton = null;
  if (button === 'noInput') {
    submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
  } else if (button === 'input') {
    submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
  }

  function inputForm(e) {

    if (e.target.name === 'time') {
      setTime(e.target.value)
      if (e.target.value && time && roomName && description) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }

    else if (e.target.name === 'roomName') {
      setRoomName(e.target.value)

      if (e.target.value && time && roomName && description) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }

    else if (e.target.name === 'description') {
      setDescription(e.target.value)

      if (e.target.value && time && roomName && description) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }
  }

  return (
    <>
      <div>
        <NavBar></NavBar>
        <div>
          <div className="test">
            <div className="test3">
              <h1 className="my-5">CREATE ROOM</h1>
              <form>
                <div className="pform" name="category" style={{ marginTop: '10px', marginBottom: '15px' }}>
                  <p style={{ height: '53px', margin: 0, padding: '15px' }}>{item.category_id}</p>
                </div>
                <div className="pform" name="price" style={{ marginTop: '20px', marginBottom: '10px' }}>
                  <p style={{ height: '53px', margin: 0, padding: '15px' }}>{item.price} 원</p>
                </div>
                <input onKeyUp={e => { inputForm(e) }} className="inputform" name="roomName" type="text" placeholder="방 제목"></input>
                {/* <input className="descriptionform" type="text" placeholder="설명"></input><br /> */}
                <div>
                  <textarea onKeyUp={e => { inputForm(e) }} className="descriptionform" name="description" placeholder="설명"></textarea>
                </div>
                {/* <input className="inputform" type="text" placeholder="방송 시작 시간"></input><br /> */}
                <div onClick={() => {
                  setTimeState(1)
                }}>
                  <TimeSet timeState={timeState} inputForm={inputForm}></TimeSet>
                </div>
                {submitButton}
              </form>
            </div>
          </div>
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