import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import UserVideoComponent from './Live/UserVideoComponent';
import NavBar from '../components/NavBar';
import './routers.css';
import { connect } from 'react-redux'
import LiveChat from './Live/LiveChat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faArrowRightFromBracket, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { LinearProgress, Stack } from '@mui/material';
import '../components/Products/products.css'
import MoodIcon from '@mui/icons-material/Mood';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';



const OPENVIDU_SERVER_URL = 'https://i7c110.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'SOLDSOLVE';

class LivePage extends Component {
  constructor(props) {
    super(props);
    const params = window.location.pathname.split('/')
    params[2] = decodeURI(params[2])

    axios({
      url: '/api/live',
      method: 'get',
      params: { sessionId: params[3] }
    })
      .then((res) => {
        if (res.data) {
          this.setState({
            chatOn: true,
            sellerInfo: res.data.product.user,
            price: res.data.product.price,
            region: res.data.product.region,
            RoomTitle: res.data.title,
            RoomContent: res.data.content,
            productID: res.data.product.no,
            nowCamera: true,
            nowVoice: true,
            loading: false,
          })
        }
      })


    this.state = {
      loading: false,
      myId: props.storeInfo.userId,
      params: params,
      mySessionId: params[3],
      myUserName: props.storeInfo.nickName,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    };


    this.state.myId = props.storeInfo.userId
    this.state.myUserName = props.storeInfo.nickName


    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
    this.CameraOff = this.CameraOff.bind(this);
    this.VoiceOff = this.VoiceOff.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    if (this.state.myId === this.state.params[2]) {
      this.deleteSession();
    }
    else {
      this.leaveSession();
    }

  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }



  joinSession() {
    this.OV = new OpenVidu();
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        mySession.on('streamCreated', (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          this.setState({
            subscribers: subscribers,
          });
        });

        mySession.on('streamDestroyed', (event) => {

          this.deleteSubscriber(event.stream.streamManager);
        });

        mySession.on('exception', (exception) => {
        });
        this.getToken(this.state.mySessionId).then((token) => {
          mySession
            .connect(
              token,
              {
                clientData: this.state.myUserName,
                clientId: this.state.myId
              },
            )
            .then(async () => {


              if (this.state.myId === this.state.params[2]) {
                var devices = await this.OV.getDevices();
                var videoDevices = devices.filter(device => device.kind === 'videoinput');

                var publisher = this.OV.initPublisher(undefined, {
                  audioSource: undefined,
                  videoSource: videoDevices[0].deviceId,
                  publishAudio: true,
                  publishVideo: true,
                  resolution: '800x500',
                  frameRate: 30,
                  insertMode: 'APPEND',
                  mirror: true,
                });

                mySession.publish(publisher);

                this.setState({
                  currentVideoDevice: videoDevices[0],
                  mainStreamManager: publisher,
                  publisher: publisher,
                });
              } else {
                var devices2 = await this.OV.getDevices();
                var videoDevices2 = devices2.filter(device => device.kind === 'videoinput');

                var publisher2 = this.OV.initPublisher(undefined, {
                  audioSource: false,
                  videoSource: false,
                  publishAudio: true,
                  publishVideo: true,
                  resolution: '800x500',
                  frameRate: 30,
                  insertMode: 'APPEND',
                  mirror: true,
                });

                mySession.publish(publisher2);

                this.setState({
                  currentVideoDevice: videoDevices2[0],
                  mainStreamManager: publisher2,
                  publisher: publisher2,
                });

              }
              this.setState({
                loading: true,
              })
            })
            .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
            });
        });
      },
    );
  }


  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: this.state.params[3],
      myUserName: localStorage.nickName,
      mainStreamManager: undefined,
      publisher: undefined
    });
  }



  async CameraOff() {
    if (this.state.nowCamera) {
      this.state.publisher.publishVideo(false);
      this.setState({
        nowCamera: false
      })
    } else {
      this.state.publisher.publishVideo(true);
      this.setState({
        nowCamera: true
      })
    }
  }

  async VoiceOff() {
    if (this.state.nowVoice) {
      this.state.publisher.publishAudio(false);
      this.setState({
        nowVoice: false
      })
    } else {
      this.state.publisher.publishAudio(true);
      this.setState({
        nowVoice: true
      })
    }
  }


  deleteSession() {
    axios
      .delete(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/sell' + this.state.productID, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        },
      })

    axios({
      url: '/api/live',
      method: 'delete',
      params: { sessionId: this.state.mySessionId }
    })

    window.location.href = '/'
  }
  render() {
    if (this.state.session === undefined) {
      this.joinSession()
    }
    return (
      <div>
        <NavBar></NavBar>
        <div className="test">
          {this.state.session !== undefined ? (

            <div id="session">
              <div className='liveTitle my-3'>
                <h3 id="session-title">{this.state.RoomTitle}</h3>
              </div>

              <div className='live_container'>
                <div>
                  {this.state.params[2] === this.state.myId ?
                    <div className='d-flex justify-content-between' style={{ marginInline: '2rem' }}>
                      <div>
                        {this.state.nowCamera ? <FontAwesomeIcon style={{ color: 'rgba(58, 153, 74, 0.918)', cursor: 'pointer' }} className='exiticon mx-3 iconsize' onClick={this.CameraOff} icon={faVideo} size="1x" /> :
                          <FontAwesomeIcon className='mx-2 iconsize' style={{ color: 'rgba(238, 81, 81, 0.918)', cursor: 'pointer' }} onClick={this.CameraOff} icon={faVideoSlash} size="1x" />}
                        {this.state.nowVoice ? <FontAwesomeIcon style={{ color: 'rgba(58, 153, 74, 0.918)', cursor: 'pointer' }} className='exiticon mx-3 iconsize' onClick={this.VoiceOff} icon={faMicrophone} size="1x" /> :
                          <FontAwesomeIcon className='mx-2 iconsize' style={{ color: 'rgba(238, 81, 81, 0.918)', cursor: 'pointer' }} onClick={this.VoiceOff} icon={faMicrophoneSlash} size="1x" />}
                        <FontAwesomeIcon className='mx-2 iconsize' style={{ color: 'rgba(238, 81, 81, 0.918)', cursor: 'pointer' }} onClick={this.deleteSession} icon={faArrowRightFromBracket} />
                      </div>
                    </div>
                    : null}
                  <div>
                    {this.state.myId === this.state.params[2] ? (
                      <div className='livebox'>
                        <UserVideoComponent className="livebox2" streamManager={this.state.mainStreamManager} />
                      </div>
                    ) : (
                      <div className='livebox'>
                        <UserVideoComponent className="livebox2" streamManager={this.state.subscribers[0]} />
                      </div>
                    )}
                  </div>
                  {this.state.sellerInfo ?
                    <>
                      <div className='sellerInfo my-2'>
                        <div className='live_profile'>
                          <img className='livechatimg' src={'https://i7c110.p.ssafy.io' + this.state.sellerInfo.profileUrl}></img>
                          <h4 style={{ marginTop: 0, marginBottom: 0, marginLeft: 10 }}>{this.state.sellerInfo.nickname} ({this.state.region})</h4>
                        </div>
                        <div className='infoList'>
                          <div className='score' style={{ marginTop: 10 }}>
                            {
                              this.state.sellerInfo.score >= 70 ?
                                <MoodIcon className='score_emotion' style={{ color: '#81c147', fontSize: '40px' }} /> : (this.state.sellerInfo.score >= 30 ?
                                  <SentimentNeutralIcon className='score_emotion' style={{ color: '#ff7f00', fontSize: '40px' }} /> :
                                  <SentimentVeryDissatisfiedIcon className='score_emotion' style={{ color: '#ff615f', fontSize: '40px' }} />)}
                            {/* <MoodIcon className='score_emotion' /> */}
                            <div className='score_text' style={{ fontSize: 18, lineHeight: '37px' }}>{this.state.sellerInfo.score}솔브</div>
                            {/* </CircularProgress> */}
                          </div>
                        </div>


                      </div>
                      <hr></hr>
                      <p style={{ margin: '2rem' }}> {this.state.RoomContent}</p>
                      <hr style={{ width: '100%' }} />
                    </>

                    : null}

                </div>

                <div>
                  {this.state.chatOn && this.state.mainStreamManager ? <LiveChat props={this.state} /> : null}
                </div>


              </div>
            </div>
          ) : null}
        </div>
      </div>

    );
  }


  getToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => {
          document.location.href = '/'
        });
    });
  }

}

const mapStateToProps = (state) => ({
  storeInfo: state.info.info
});

export default connect(mapStateToProps)(LivePage);
