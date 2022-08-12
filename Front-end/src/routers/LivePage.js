import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import UserVideoComponent from './Live/UserVideoComponent';
import NavBar from '../components/NavBar';
import './routers.css';
import { connect } from 'react-redux'
import LiveChat from './Live/LiveChat';


const OPENVIDU_SERVER_URL = 'https://i7c110.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'SOLDSOLVE';

class LivePage extends Component {
  constructor(props) {

    super(props);

    const params = window.location.pathname.split('/')

    axios({
      url: '/api/live',
      method: 'get',
      params: { sessionId: params[3] }
    })
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          this.setState({
            sellerInfo: res.data.product.user,
            price: res.data.product.price,
            region: res.data.product.region,
            RoomTitle: res.data.title,
            RoomContent: res.data.content,
            productID : res.data.product.no
          })
        }
      })


    this.state = {
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
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
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
          console.warn(exception);
        });
        this.getToken(this.state.mySessionId).then((token) => {
          mySession
            .connect(
              token,
              { clientData: this.state.myUserName },
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

                console.log(publisher)
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
                  audioSource: undefined,
                  videoSource: false,
                  publishAudio: false,
                  publishVideo: false,
                  resolution: '800x500',
                  frameRate: 30,
                  insertMode: 'APPEND',
                  mirror: true,
                });

                console.log(publisher2)
                mySession.publish(publisher2);

                this.setState({
                  currentVideoDevice: videoDevices2[0],
                  mainStreamManager: publisher2,
                  publisher: publisher2,
                });

              }
              console.log(publisher)
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
    document.location.href = '/'
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices()
      var videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {

        var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

        if (newVideoDevice.length > 0) {
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true
          });

          await this.state.session.unpublish(this.state.mainStreamManager)

          await this.state.session.publish(newPublisher)
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  deleteSession() {
    axios({
      url: '/api/live',
      method: 'delete',
      params: { sessionId: this.state.mySessionId }
    })
      .then((res) => {
        console.log(res)
      })

    axios
      .delete(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/sell'+this.state.productID, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        },
      })
      .then((res) => {
        console.log(res)
      })
    console.log(1234)
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
                        <input
                          className="btn btn-large btn-danger mx-1 video_button"
                          type="button"
                          id="buttonLeaveSession"
                          onClick={this.deleteSession}
                          value="나가기"
                        />
                        <input
                          className="btn btn-large btn-success mx-1 video_button"
                          type="button"
                          id="buttonSwitchCamera"
                          onClick={this.switchCamera}
                          value="카메라변경"
                        />
                      </div>
                      <h3>시청자 : {this.state.subscribers.length}</h3>
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
                      <p style={{ margin: '1em' }}>
                        <img className='livechatimg' src={'https://i7c110.p.ssafy.io' + this.state.sellerInfo.profileUrl}></img>
                        {this.state.sellerInfo.nickname} ({this.state.region}), 평점</p>
                      <p style={{ margin: '1em' }}> {this.state.RoomContent}</p>
                      <hr style={{ width: '100%' }} />
                    </>

                    : null}

                </div>

                <div>
                  <LiveChat props={this.state} />
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
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => {
          alert("아직 라이브방이 개설되지 않았습니다.")
          document.location.href = '/'
        });
    });
  }

}

const mapStateToProps = (state) => ({
  storeInfo: state.info.info
});

export default connect(mapStateToProps)(LivePage);
