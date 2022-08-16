import React from 'react';
import './modal.css';
import axios from 'axios';
import { useState } from 'react';
import RequestedPrice from './RequestedPrice';


const OfferBuyerModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴 헤더에 room데이터 가져와서
  const { open, close, header, productid } = props;
  const [button, setButton] = useState('noInput')
    const [money, setMoney] = useState(null)
    const [changedata, setChangeData] = useState(false)

    function inputMoney(e) {
      setMoney(e.target.value)
      if (e.target.value) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }

    let submitButton = null;
    if (button === 'noInput') {
      submitButton = <button className="offerSubmitButton" type="submit" disabled={true} style={{width: 100}}>SUBMIT</button>
    } else if (button === 'input') {
      submitButton = <button className="offerSubmitButton" type="submit" style={{width: 100}}>SUBMIT</button>

    }

    function Offer(e, money) {
      e.preventDefault()
      axios({
        url: '/api/offers/' + productid,
        method: 'post',
        headers: { Authorization: `Bearer ${localStorage.token}` },
        data: {price: money}
      })
        .then(res => {
          alert('가격 제안 성공')
          setMoney('')
          setChangeData(true)

        })
        .catch(err => {
          console.error(err.response.data)
        })
    }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <div className='offerModal'>

          <div className='scoreTop'>
            <button className="close closeButton" onClick={close}>&times;</button>
          </div>

          <div className='offerMain'>
            <div className='offerTitle' style={{marginTop: -10}}>
              <p className='titleText'>원하는 가격을 제안해주세요!</p>
            </div>
            
            <div className='offerBox' style={{marginTop: 20, marginBottom: -20, display: 'flex', justifyContent: 'center', marginLeft: '-10%'}}>
              <RequestedPrice productid={productid} changedata={changedata}/>
            
            </div>
          </div>
          <div className='offerBottom'>
          <form onSubmit={e => { Offer(e, money) }} className='d-flex align-items-center my-2 justify-content-between'>
              <input className="offerInput" onChange={e => { inputMoney(e) }} type="number" placeholder="가격을 입력해주세요" value={money}></input>
            {submitButton}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OfferBuyerModal;