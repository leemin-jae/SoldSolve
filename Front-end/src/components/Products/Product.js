import React, { useEffect, useState } from 'react'
import '../../routers/routers.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './Carousel.css'
import NavBar from '../../components/NavBar';
import axios from 'axios';
import './products.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import NotFound from '../../routers/PageNotFound'
import LikeButton from './LikeButton';
import LiveButton from './LiveButton';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Modal from '../Modals/Modal';
import '../Modals/modal.css';
import ShareIcon from '@mui/icons-material/Share';
import CopyToClipboard from 'react-copy-to-clipboard';


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
  const [timeState, setTimeState] = useState(1)
  const [livetime, setLiveTime] = useState(null)
  const [load, setLoad] = useState(0)

  const url = window.location.href;

  let store = useSelector((state) => { return state })
  let navigate = useNavigate()
  useEffect(() => {
    axios({
      url: `/api/product/${productid}`,
      method: 'get',
    })
      .then(res => {
        console.log(res)
        setProductData(res.data)
        setYouNick(res.data.user.nickname)
        setUserId(res.data.user.userid)
        let money = res.data.price;
        money = Number(String(money).replaceAll(',', ''));
        const formatValue = money.toLocaleString('ko-KR');
        setMoney(formatValue)
        setCat(res.data.category)
        setRequser(res.data.requestsUser)
        setSell(res.data.state)
        setLoad(1)
        setLiveTime(res.data.liveTime)
      })
      .catch(err => {
        console.error(err)
        setLoad(1)
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
        recList = result.data.filter((x) => x.category === cat).sort(function (a, b) {
          return b.viewCount - a.viewCount
        }).slice(0, 14)
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
          let price = product.price
          const productPrice = price.toLocaleString('ko-KR');
          if (product.state === 0) {
            return (
              <div key={product.no}>
                <div className='category_reco' >
                  <img style={{ cursor: 'pointer' }} onClick={() => {
                    navigate(goDetail)
                  }} className='category_img'
                    src={mainImg}
                    alt={product.title}
                  />
                  <div className='category_content d-flex flex-column justify-content-center align-items-center'>
                    <h6 className='category_title' style={{ marginTop: '15px', fontSize: '12px' }}>{product.title}</h6>
                    <p className='category_text' style={{ fontSize: '11px' }}>{productPrice}원</p>
                  </div>
                </div>

              </div>
            )
          }

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



  const ShowReq = () => {
    return (
      <>
        {requser.length ?
          <>
            {requser.map((user) => {
              return (
                <li className='managementUser' key={user.id}>
                  <h6 style={{ margin: '0', padding: '5px' }}>{user.nickname}<span>({user.userid})</span></h6>
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

  function createLive(e) {
    e.preventDefault();
    document.location.href = `/createroom/${productid}`
  }
  function goLive(e) {
    e.preventDefault();
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
          navigate('/chatroom/' + res.data, {
            state:
            {
              roomId: res.data,
              me: store.info.info.nickName,
              you: youNick,
              yourId: productData.user.userid,
              myId: store.info.info.userId,
              sellerId: productData.user.userid,
              yourPk: productData.user.id
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  const imglist = []
  if (productData && productData.productImg.length > 0) {
    for (let i = 0; i < productData.productImg.length; i++) {
      imglist.push(<div id="slide-1" key={i}><img className='carousel_img' src={'https://i7c110.p.ssafy.io' + productData.productImg[i].path} alt=""></img></div>)
    }
  }

  function SessionCheck() {
    axios
      .get(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/sell' + productid, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        },
      })
      .then((res) => {
        document.location.href = `/live/${productData.user.userid}/sell${productid}`
      })
      .catch((err) => {
        console.log(err)
        alert("아직 라이브방이 생성되지 않았습니다.")
      })
  }
  function timebutton(e) {
    e.preventDefault();
    if (timeState) {
      setTimeState(0)
    } else {
      setTimeState(1)
      const selectTime = document.getElementById('LiveTime').value

      axios({
        url: `/api/product/time`,
        method: 'post',
        data: {
          no: productid,
          time: document.getElementById('LiveTime').value
        },
      })
        .then(res => {
          console.log(res)
          setLiveTime(res.data)
        })
        .catch(err => {
          console.log(err)
        })

    }
  }


  function TimeSet(props) {
    if (props.timeState === 1) {
      return <button className='submitbutton-able' onClick={e => timebutton(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브 시간설정</button>
    } else {
      return <>
        <button className='submitbutton-able' onClick={e => timebutton(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>설정하기</button>
      </>
    }
  }

  return (
    <>
      {load ?
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
                </div>
              </div>
              <div className='user_box'>
                <div className='user_info'>
                  <img className="livechatimg" src={'https://i7c110.p.ssafy.io' + productData.user.profileUrl} alt="#"></img>
                  <p className='user_name mx-2' style={{ margin: '1em 1em 1em 0', fontSize: '16px', fontWeight: 'bold' }}>
                    {productData.user.nickname} ({productData.region})</p>
                </div>
                <div className='score' style={{ marginTop: '30px' }}>
                  {
                    productData.user.score >= 40 ?
                      <MoodIcon className='score_emotion' style={{ color: '#81c147', fontSize: '30px' }} /> : (productData.user.score >= 20 ?
                        <SentimentNeutralIcon className='score_emotion' style={{ color: '#ff7f00', fontSize: '30px' }} /> :
                        <SentimentVeryDissatisfiedIcon className='score_emotion' style={{ color: '#ff615f', fontSize: '30px' }} />)}
                  {/* <MoodIcon className='score_emotion' /> */}
                  <p className='score_text' style={{ marginBottom: '0 ' }}>{productData.user.score}솔브</p>
                  {/* </CircularProgress> */}
                </div>
              </div>

              <div className='product_description'>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='titletext' style={{ margin: '0 10px 0px 10px' }}>{productData.title}</h1>
                  {store.info.info && productData.state ?
                    <button className='submitbutton-able' style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }} disabled>판매완료된 상품</button> : null
                  }
                </div>
                <div style={{ marginInline: '10px' }}>
                  {productData.tag.map((tag) => {
                    function tagSearch() {
                      document.location.href = `/search/tag/` + tag.name;
                    }
                    return <label key={tag.id} onClick={e=>tagSearch()} className="tagbox">#{tag.name}</label>
                  })}
                </div>
                <hr></hr>
                <div className='d-flex justify-content-between'>
                  <h5 className='pricetext' style={{ margin: '0 10px 0 10px' }}>판매가 : {money}원</h5>
                  {store.info.info && store.info.info.userId === productData.user.userid ?
                    <div>
                      <div>
                        <FontAwesomeIcon className='mx-3 iconsize' style={{ color: 'rgba(58, 153, 74, 0.918)' }} size="lg" onClick={e => editProduct(e)} icon={faPenToSquare} />
                        <FontAwesomeIcon className='mx-2 iconsize' style={{ color: 'rgba(238, 81, 81, 0.918)' }} size="lg" onClick={e => deleteProduct(e)} icon={faTrash} />
                      </div>
                    </div>
                    : null}
                </div>

                <br></br>
                <p style={{ margin: '0 10px 0 10px', minHeight: '400px', paddingBlock: '30px' }}>{productData.content}</p>

                <div className='d-flex justify-content-between'>
                  {store.info.info.userId === productData.user.userid ?
                    <>
                      <div className='d-flex'>
                        <button className='submitbutton-able' onClick={e => createLive(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브</button>
                        <button className='submitbutton-able' onClick={openReqModal} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브 요청목록</button>
                        {livetime ? <button className='submitbutton-able' style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }} disabled>{livetime.slice(5, 7)}월 {livetime.slice(8, 10)}일 {livetime.slice(11, 13)}시 {livetime.slice(14, 16)}분</button> : <TimeSet timeState={timeState}></TimeSet>}
                        <input className="liveTimeset inputform2" id="LiveTime" type="datetime-local" placeholder="방송 시작 시간" hidden={timeState}></input>
                        <Modal open={reqModalOpen} close={closeReqModal} header="라이브 요청 목록">
                          <ul><ShowReq /></ul>
                        </Modal>
                      </div>
                    </>
                    :
                    <div>
                      <button className='submitbutton-able' onClick={e => goLive(e)} style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }}>라이브방</button>
                      {productData.liveTime ? <button className='submitbutton-able' style={{ border: '0', borderRadius: '10px', height: '30px', margin: '0 0 0 10px' }} disabled>{productData.liveTime.slice(5, 7)}월 {productData.liveTime.slice(8, 10)}일 {productData.liveTime.slice(11, 13)}시 {productData.liveTime.slice(14, 16)}분</button> : null}
                    </div>}
                </div>
                <hr></hr>
                {localStorage.token && productData.state === 0 ? (
                  <>
                    {store.info.info.userId === productData.user.userid
                      ? null :
                      <div>
                        <LikeButton no={productData.no} />
                        <IconButton aria-label="add to favorites" onClick={createRoom}>
                          <ChatIcon />
                        </IconButton>
                        {livetime ? null : <LiveButton no={productData.no} />}
                        <IconButton aria-label="share" onClick={function () { alert('링크가 복사되었습니다.') }} >
                          <CopyToClipboard text={url}>
                            <ShareIcon />
                          </CopyToClipboard>
                        </IconButton>
                      </div>
                    }
                  </>
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
        : null}

    </>
  )
}

export default Product