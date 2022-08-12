import React, { useEffect, useState } from 'react'
import '../../routers/routers.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './Carousel.css'
import NavBar from '../../components/NavBar';
import axios from 'axios';
import './products.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import NotFound from '../../routers/PageNotFound'
import LikeButton from './LikeButton';
import LiveButton from './LiveButton';

import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Modal from '../Modals/Modal';
import '../Modals/modal.css';


const OPENVIDU_SERVER_URL = 'https://i7c110.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'SOLDSOLVE';

function Product() {
  const [recproducts, setRecProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const productid = useParams().id;
  const [money, setMoney] = useState('')
  const [userId, setUserId] = useState('')
  const [cat, setCat] = useState('')
  const [requser, setRequser] = useState([])
  const [youNick, setYouNick] = useState('')
  const [sell, setSell] = useState(0)

  let store = useSelector((state) => { return state })
  let navigate = useNavigate()
  console.log(store)
  useEffect(() => {
    axios({
      url: `/api/product/${productid}`,
      method: 'get',
    })
      .then(res => {
        console.log(res)
        setProductData(res.data)
        console.log(res.data.user, '이름찾자')
        setYouNick(res.data.user.nickname)
        console.log(youNick, '상대 닉넴')
        setUserId(res.data.user.userid)
        let money = res.data.price;
        // console.log(money)
        money = Number(String(money).replaceAll(',', ''));
        const formatValue = money.toLocaleString('ko-KR');
        setMoney(formatValue)
        setCat(res.data.category)
        setRequser(res.data.requestsUser)
        setSell(res.data.state)
      })
      .catch(err => {
        console.error(err)
      })

  }, [productid])

  useEffect(() => {
    setLoading(true)
    async function fetchRecData() {
      const result = await axios.get(
        `/api/product`
      );
      setLoading(false)
      let recList = null;
      if (result.data && result.data.length > 0) {
        recList = result.data.filter((x) => x.category === cat)
      }
      setRecProducts(recList);
    }
    fetchRecData();

  }, [cat]);


  const ShowRecProducts = () => {
    return (
      <>{
        recproducts.map((product) => {
          let goDetail = '/product/' + product.no
          let mainImg = null;
          if (product.productImg.length > 0) {
            mainImg = 'https://i7c110.p.ssafy.io' + product.productImg[0].path
          }
          return (
            <div key={product.no}>
              <div className='category_reco' >
                <img style={{ cursor: 'pointer' }} onClick={() => {
                  navigate(goDetail)
                }} className='category_img'
                  src={mainImg}
                  alt={product.title}
                />
                <div className='category_content'>
                  <h6 className='category_title' style={{ marginTop: '15px', fontSize: '12px' }}>{product.title}</h6>
                  <p className='category_text' style={{ fontSize: '11px' }}>{product.price}</p>
                </div>
              </div>

            </div>
          )
        })
      }</>)
  }

  const Loading = () => {
    return (
      <>
        Loading...
      </>
    );
  };

  function editProduct(e) {
    e.preventDefault();
    document.location.href = `/editproduct/${productid}`
  }
  function deleteProduct(e) {
    e.preventDefault();
    if (window.confirm("정말 이 상품을 삭제하시겠습니까?")) {
      axios({
        url: `/api/product/${productid}`,
        method: 'delete',
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res)
          alert('삭제되었습니다')
          document.location.href = '/'
        })
        .catch(err => {
          console.error(err)
        })
    }
  }



  const [reqModalOpen, setReqModalOpen] = useState(false);

  const openReqModal = () => {
    setReqModalOpen(true);
  };
  const closeReqModal = () => {
    setReqModalOpen(false);
  };

  const [sellModalOpen, setSellModalOpen] = useState(false);

  const openSellModal = () => {
    setSellModalOpen(true);
  };
  const closeSellModal = () => {
    setSellModalOpen(false);
  };

  const ShowReq = () => {
    return (
      <>
        {requser.length ?
          <>
            {requser.map((user) => {
              return (
                <li key={user.id}>
                  {user.nickname}
                </li>
              );
            })}
          </>
          :
          <>
            <h5>라이브를 요청한 사람이 없습니다
            </h5>
          </>
        }
      </>
    );
  };

  const SellProduct = () => {
    const [button, setButton] = useState('noInput')
    const [id, setId] = useState(null)

    function inputId(e) {
      setId(e.target.value)
      if (e.target.value) { setButton('input') }
      else if (e.target.value === '') { setButton('noInput') }
    }

    let submitButton = null;
    if (button === 'noInput') {
      submitButton = <button className="inputform submitbutton-disable" type="submit" disabled={true}>SUBMIT</button>
    } else if (button === 'input') {
      submitButton = <button className="inputform submitbutton-able" type="submit">SUBMIT</button>
    }

    function trySell(e, id) {
      // console.log(getLoginForm)
      e.preventDefault()
      axios({
        url: '/api/deal',
        method: 'post',
        params: { no: productid, buyerId: id },
      })
        .then(res => {
          alert('거래가 완료되었습니다')
          document.location.href = `/product/${productid}`
        })
        .catch(err => {
          console.error(err.response.data)
        })
    }
    return (
      <>
        {sell ?
          <>
            <h5>이미 판매된 상품입니다
            </h5>
          </>
          :
          <>

            <form onSubmit={e => { trySell(e, id) }}>
              <div>구매하시는분의 ID를 입력해주세요</div>
              <input className="inputform" onChange={e => { inputId(e) }} type="text" placeholder="ID"></input>
              {submitButton}
            </form>
          </>
        }
      </>
    );
  };

  function createLive(e) {
    e.preventDefault();
    document.location.href = `/createroom/${productid}`
  }
  function goLive(e) {
    e.preventDefault();
    console.log(productData.user.userid)
    SessionCheck()
  }

  const createRoom = () => {
    if (window.confirm("판매자와 연락하시겠습니까?")) {
      axios({
        url: '/api/room',
        method: 'post',
        params: { seller: userId },
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res.data, '방생성')
          navigate('/chatroom/' + res.data, { state: { roomId: res.data, me: store.info.info.nickName, you: youNick, meId: store.info.info.userId } })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  const imglist = []
  if (productData && productData.productImg.length > 0) {
    console.log(1234)
    for (let i = 0; i < productData.productImg.length; i++) {
      console.log(productData.productImg[i].path)
      imglist.push(<div id="slide-1"><img className='carousel_img' src={'https://i7c110.p.ssafy.io' + productData.productImg[i].path} alt=""></img></div>)
    }
  }

  function SessionCheck() {
    axios
      .get(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/sell' + productid, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        },
      })
      .then(() => {
        document.location.href = `/live/${productData.user.userid}/sell${productid}`
      })
      .catch(() => {
        alert("아직 라이브방이 생성되지 않았습니다.")
      })
  }

  return (
    <>
      {productData ?
        <div>
          <div className='fixnav'>
            <NavBar />
          </div>
          <div className='carousel_box'>
            <div className="slider">
              <div className="slides">
                {imglist}
              </div>

              {/* <a href="#slide-1"></a>
            <a href="#slide-2"></a>
            <a href="#slide-3"></a>
            <a href="#slide-4"></a> */}
            </div>
          </div>
          <div className='user_box'>
            <div className='user_info'>
              <img className="livechatimg" src={'https://i7c110.p.ssafy.io' + productData.user.profileUrl} alt="#"></img>
              <p className='user_name mx-2' style={{ margin: '1em 1em 1em 0' }}>
                {productData.user.nickname} ({productData.region})</p>
            </div>
            <p className='score' style={{ marginTop: '30px' }}>평점</p>
          </div>

          <div className='product_description'>
            <h3 style={{ margin: '0 10px 20px 10px' }}>{productData.title}</h3>
            <hr></hr>
            <h5 style={{ margin: '0 10px 0 10px' }}>판매가 : {money}원</h5>
            <br></br>
            <p style={{ margin: '0 10px 0 10px' }}>{productData.content}</p>
            <hr></hr>
            {localStorage.token ? (
              <div className='button_box'>
                {store.info.info.userId === productData.user.userid
                  ?
                  <>
                    <button className='submitbutton-able' onClick={e => createLive(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브방</button>
                    <div>
                      <button className='submitbutton-able' onClick={openSellModal} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>판매</button>
                      <Modal open={sellModalOpen} close={closeSellModal} header="판매창">
                        <div><SellProduct /></div>
                      </Modal>
                      <button className='submitbutton-able' onClick={openReqModal} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브요청목록</button>
                      <Modal open={reqModalOpen} close={closeReqModal} header="라이브 요청 목록">
                        <ul><ShowReq /></ul>
                      </Modal>
                      <button className='submitbutton-able' onClick={e => editProduct(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>수정</button>
                      <button className='submitbutton-able' onClick={e => deleteProduct(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>삭제</button>
                    </div>

                  </>

                  :
                  <>
                    <button className='submitbutton-able' onClick={e => goLive(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브방</button>
                    <div>
                      {/* <FontAwesomeIcon icon={faHeart} size="2x" style={{ marginRight: '10px', padding: '0 0 0 8px', color: 'red' }} /> */}
                      <LikeButton no={productData.no} />
                      {/* <button className='submitbutton-able' style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }} onClick={createRoom}>채팅하기</button> */}
                      <IconButton aria-label="add to favorites" onClick={createRoom}>
                        <ChatIcon />
                      </IconButton>
                      <LiveButton no={productData.no} />
                    </div>
                  </>
                }
              </div>
            ) : null}
          </div>
          <hr></hr>
          <h5 style={{ textAlign: "center" }}>카테고리 별 추천 상품</h5>
          <div className='category_reco_box'>
            {loading ? <Loading /> : <ShowRecProducts />}
          </div>
        </div> : <NotFound />
      }

    </>
  )
}

export default Product
