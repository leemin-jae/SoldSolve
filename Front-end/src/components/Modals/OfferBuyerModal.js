import React from 'react';
import './modal.css';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import RequestedPrice from './RequestedPrice';


const OfferBuyerModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴 헤더에 room데이터 가져와서
  const { open, close, header, productid } = props;
  const [button, setButton] = useState('noInput')
    const [money, setMoney] = useState(null)

    function inputMoney(e) {
      setMoney(e.target.value)
      if (e.target.value) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }

    let submitButton = null;
    if (button === 'noInput') {
      submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
    } else if (button === 'input') {
      submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
    }

    function Offer(e) {
      // console.log(getLoginForm)
      e.preventDefault()
      axios({
        url: '/api/offers/' + productid,
        method: 'post',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          alert('가격 제안 성공')
        })
        .catch(err => {
          console.error(err.response.data)
        })
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
              <p className='titleText'>원하는 가격을</p>
              <p className='titleText'>제안해주세요!</p>
            </div>
            
            <div className='scoreCheckBox'>
              <RequestedPrice />
            
            </div>
          </div>
          <div className='scoreBottom'>
          <form onSubmit={e => { Offer(e) }} className='d-flex align-items-center my-2'>
              <input className="inputform" onChange={e => { inputMoney(e) }} type="text" placeholder="가격을 입력해주세요"></input>
            </form>
            {submitButton}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OfferBuyerModal;