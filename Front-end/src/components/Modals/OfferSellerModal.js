import React from 'react';
import './modal.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import RequestedPrice from './RequestedPrice';


const OfferSellerModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴 헤더에 room데이터 가져와서
  const { open, close, header, productid } = props;
  const changedata = 'seller';



  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ?
      <div className='offerModal'>
                  <div className='scoreTop'>
            <button className="close closeButton" onClick={close}>&times;</button>
          </div>
          <div className='offerMain'>
          <div className='offerTitle' style={{marginTop: -10}}>
              <p className='titleText'>지금까지 제안된 가격입니다</p>
            </div>
          <div className='offerBox' style={{marginTop: 20, marginBottom: -20, display: 'flex', justifyContent: 'center', marginLeft: '-10%'}}>
      <RequestedPrice productid={productid} changedata={changedata}/>
      </div>
      </div>
      </div> : null}
    </div>
  );
};

export default OfferSellerModal;