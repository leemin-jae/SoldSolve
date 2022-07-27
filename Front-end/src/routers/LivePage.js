// import axios from 'axios';
// import OpenViduSession from 'openvidu-react';
// import NavBar from '../components/NavBar';

// function LivePage() {
//   const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
//   const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
//   let state = {
//     mySessionId: 'SessionA',
//     myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
//     token: undefined,
//     }
  
// function createLive(sessionId) {
//   axios({
//     url: OPENVIDU_SERVER_URL+'/openvidu/api/sessions',
//     method: 'post',
//     data: JSON.stringify({ customSessionId: sessionId }),
//     headers = {1},
//   })
//     .then(res => {
//       const token = res.data.accessToken
//       localStorage.setItem('token', token)
//       document.location.href = '/'
//     })
//     .catch(err => {
//       console.error(err.response.data)
//     })
// }

//   return (
//     <div>
//       <NavBar></NavBar>
//       <h1 className='test'>라이브 페이지</h1>
//     </div>
//   );
// }

// export default LivePage;