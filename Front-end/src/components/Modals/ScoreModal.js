import React from 'react';
import './modal.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'


const ScoreModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴 헤더에 room데이터 가져와서
  const { open, close, header } = props;
  const [score,setScore] = useState(null);
  const [button,setButton] = useState('noInput');

  function scoreCheck(e){

    if (score){
      if (score === e.currentTarget.id){
        document.getElementById(`${score}`).classList.remove("scorecheckedcolor")
      } else {
      document.getElementById(`${score}`).classList.remove("scorecheckedcolor")
      e.currentTarget.classList.add("scorecheckedcolor")
      setScore(e.currentTarget.id)
      setButton('input')
      }
    } else {
      e.currentTarget.classList.add("scorecheckedcolor")
      setScore(e.currentTarget.id)
      setButton('input')
    }

    
  }

  let submitButton = null;
  if (button === 'noInput') {
    submitButton = <button className="submitbutton-disable scoreSubmit" disabled={true}>SUBMIT</button>
  } else if (button === 'input') {
    submitButton = <button className="submitbutton-able scoreSubmit">SUBMIT</button>
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <div className='scoreModal'>

          <div className='scoreTop'>
            <button className="close closeButton" onClick={close}>&times;</button>
          </div>

          <div className='scoreMain'>
            <div className='scoreTitle'>
              <p className='titleText'>거래 했던 상대방을</p>
              <p className='titleText'>평가해주세요!</p>
            </div>
            
            <div className='scoreCheckBox'>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="5" onClick={e=>scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>매우 착해요!</p></div>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="4" onClick={e=>scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>착해요!</p></div>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="3" onClick={e=>scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>평범했어요!</p></div>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="2" onClick={e=>scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>살짝 나빠요!</p></div>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="1" onClick={e=>scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>매우 나빠요!</p></div>
            </div>
          </div>

          <div className='scoreBottom'>
            {submitButton}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ScoreModal;