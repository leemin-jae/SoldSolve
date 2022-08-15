import React, { useEffect } from 'react';
import './modal.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const ScoreModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴 헤더에 room데이터 가져와서
  const { open, close, header } = props;
  const [score, setScore] = useState(null);
  const [myItem, setMyItem] = useState(null);
  const [sellItem, setSellItem] = useState(null);
  const [sellerMethod, setSellerMethod] = useState('post');

  useEffect(() => {
    console.log(header)
    if (header.scoreMethod === 'patch') {
      setSellerMethod('patch')
    }
    if (header.myId === header.seller) {
      axios({
        url: '/api/product/me',
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res)
          setMyItem(res.data)
        })
        .catch(err => {
          console.error(err.response.data)
        })

      axios({
        url: '/api/reviews/check/' + header.yourPk,
        method: 'get',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          if (res.data == true) {
            setSellerMethod('patch')
          }
        })
        .catch(err => {
          console.error(err.response.data)
        })
    }
  }, [open])

  function scoreCheck(e) {
    if (score) {
      if (score === e.currentTarget.id) {
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
  function evaluation() {
    let content = null;
    if (score === 5) { content = "매우 착해요!" }
    else if (score === 4) { content = "착해요!" }
    else if (score === 3) { content = "평범했어요!" }
    else if (score === 2) { content = "살짝 나빠요!" }
    else if (score === 1) { content = "매우 나빠요!" }

    axios({
      url: '/api/reviews/' + header.yourPk,
      method: sellerMethod,
      headers: { Authorization: `Bearer ${localStorage.token}` },
      data: { score: score, content: content }
    })
      .then(res => {
        alert("평가가 완료되었습니다")
        close()
        window.location.href = '/'
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }
  function submitScore(e) {
    e.preventDefault();
    if (header.myId === header.seller) {
      if (sellItem) {
        axios({
          url: '/api/deal',
          method: 'post',
          params: { no: sellItem, buyerId: header.yourId },
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.error(err.response.data)
          })
        evaluation()
      } else {
        alert("판매하는 상품을 골라주세요.")
      }

    } else {
      evaluation()
    }
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <div className='scoreModal'>

          <div className='scoreTop'>
            <button className="close closeButton" onClick={close} style={{ width: '20px' }}>&times;</button>
          </div>

          <div >
            <div className='scoreTitle'>
              <p className='titleText'>상대방을 <span style={{ color: '#6667ab' }}>평가</span>해주세요 <span style={{ color: '#6667ab' }}>:D</span></p>

              {header.myId === header.seller && myItem ?
                <div>
                  <p>판매하는 상품을 골라주세요</p>
                  <select className='optionscroll' onChange={e => setSellItem(e.target.value)}>
                    <option className='optionfont' selected disabled>내 판매상품</option>
                    {myItem.map((pruduct) => {
                      if (pruduct.state === 0) {
                        return (
                          <option className='optionfont' key={pruduct.no} value={pruduct.no}>{pruduct.title}</option>
                        )
                      }
                    })}
                  </select>
                </div>
                : null}
            </div>

            <div className='scoreCheckBox'>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="5" name="테스트" onClick={e => scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>매우 착해요!</p></div>
              <div className='d-flex align-items-center my-2' style={{ position: 'relative' }}><FontAwesomeIcon className='scoreCheck' style={{ marginRight: '106px', }} id="4" onClick={e => scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect' style={{ position: 'absolute', right: '19px' }}>착해요!</p></div>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="3" onClick={e => scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>평범 했어요!</p></div>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="2" onClick={e => scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>살짝 나빠요!</p></div>
              <div className='d-flex align-items-center my-2'><FontAwesomeIcon className='scoreCheck' id="1" onClick={e => scoreCheck(e)} icon={faSquareCheck} size="2x" /><p className='scoreSelect'>매우 나빠요!</p></div>
            </div>
          </div>

          <div className='scoreBottom'>
            <button className="submitbutton-able scoreSubmit" onClick={e => submitScore(e)} style={{ fontWeight: 'bold', fontSize: '18px' }}>평가하기</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ScoreModal;