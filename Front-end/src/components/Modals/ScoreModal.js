import React, { useEffect } from 'react';
import './modal.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const ScoreModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴 헤더에 room데이터 가져와서
  const { open, close, header } = props;
  const [score,setScore] = useState(null);


  console.log(header)
  function trySell() {
    axios({
      url: '/api/deal',
      method: 'post',
      params: { no: header.productId, buyerId: 11 },
    })
      .then(res => {
        alert('거래가 완료되었습니다')
        document.location.href = `/product/${header.productId}`
      })
      .catch(err => {
        console.error(err.response.data)
        alert('ID를 다시 확인해주세요') 
      })
  }


  function scoreCheck(e){

    if (score){
      if (score === e.currentTarget.id){
        document.getElementById(`${score}`).classList.remove("scorecheckedcolor")
        setScore(null)
      } else {
      document.getElementById(`${score}`).classList.remove("scorecheckedcolor")
      e.currentTarget.classList.add("scorecheckedcolor")
      setScore(e.currentTarget.id)
      }
    } else {
      e.currentTarget.classList.add("scorecheckedcolor")
      setScore(e.currentTarget.id)
    } 
  }

  function submitScore(e){
    e.preventDefault();
    console.log(header.buyerId)
    if (header.seller === header.myId) {
      console.log('내가 판매자일때')
      // trySell()
    } else{
      console.log('구매자일때')
    }
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
            <button className="submitbutton-able scoreSubmit" onClick={e=>submitScore(e)}>SUBMIT</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ScoreModal;