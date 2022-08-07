import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import UserVideoComponent from './Live/UserVideoComponent';
import NavBar from '../components/NavBar';
import './routers.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons'

const OPENVIDU_SERVER_URL = 'https://i7c110.p.ssafy.io:3478';
const OPENVIDU_SERVER_SECRET = 'SOLDSOLVE';

const OPENVIDU_SERVER_URL = 'https://i7c110.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'SOLDSOLVE';

class LivePage extends Component {
  constructor(props) {

    super(props);

    const params = window.location.pathname.split('/')



    this.state = {
      myId:undefined,
      params: params,
      mySessionId: params[3],
      myUserName: localStorage.nickName,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    };

    axios({
      url: '/api/users/me',
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.token}` }
    })
      .then(res => {
        this.state.myId = res.data.userId
        this.state.myUserName = res.data.nickName
      })
      .catch(err => {
        console.error(err)
      })

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
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

              this.setState ({
              currentVideoDevice: videoDevices[0],
              mainStreamManager: publisher,
              publisher: publisher,
              });
            } else {
                var devices = await this.OV.getDevices();
                var videoDevices = devices.filter(device => device.kind === 'videoinput');

                  var publisher = this.OV.initPublisher(undefined, {
                  audioSource: false,
                  videoSource: false,
                  publishAudio: false,
                  publishVideo: false,
                  resolution: '800x500',
                  frameRate: 30,
                  insertMode: 'APPEND',
                  mirror: true,
                  });
                
                console.log(publisher)
                mySession.publish(publisher);

                this.setState ({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
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

  render() {
    if (this.state.session === undefined) {
      this.joinSession()
    }
    console.log(this.state.subscribers  )
    return (
      <div>
        <NavBar></NavBar>
        <div className="test">
          {this.state.session !== undefined ? (

            <div id="session">
              <div className='d-flex liveTitle my-3 justify-content-between'>
                <h3 id="session-title">{localStorage.LiveRoom}</h3>
                <div>
                  <input
                  className="btn btn-large btn-danger mx-1 video_button"
                  type="button"
                  id="buttonLeaveSession"
                  onClick={this.leaveSession}
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
                
              </div>

              <div className='live_container'>

                <div>
                  <div>
                    { this.state.myId === this.state.params[2] ? (
                      <div className='livebox'> 
                        <UserVideoComponent className="livebox2" streamManager={this.state.mainStreamManager} />
                      </div>
                    ) : (
                      <div className='livebox'>
                        <UserVideoComponent className="livebox2" streamManager={this.state.subscribers[0]} />
                      </div>
                    )}
                  
                  </div>
                  <p style={{ margin: '1em' }}><FontAwesomeIcon icon={faUser} size="2x" style={{ marginRight: '10px' }} />
                    닉네임 (본인이 설정한 지역), 평점</p>
                  <p style={{ margin: '1em' }}> ~~~~ 팝니다!</p>
                  <hr style={{ width: '100%' }} />
                </div>
                <div>
                  <div className='chatbox'><h3>채팅방</h3></div>
                  <div>
                    <input className='inputform3' type="text" />
                    <button className='inputsubmitbutton'>입력</button>
                  </div>
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

export default LivePage;
