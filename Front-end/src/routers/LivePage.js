// import axios from 'axios';
// import OpenViduSession from 'openvidu-react';
// import NavBar from '../components/NavBar';
// import { useState } from 'react'


// function LivePage() {
//   const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
//   const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
//   const [mySessionId,setMySessionId] =useState('SessionA')
//   const [myUserName,setMyUserName] =useState('OpenVidu_User_' + Math.floor(Math.random() * 100))
//   const [token,setToken] = useState(null)
//   const [session,setSession] = useState(null)

//   function joinSession(event) {
//     event.preventDefault();
//     if (mySessionId && myUserName) {
//       createSession()
//       event.preventDefault();
//     }
//   }


//   function getToken() {
//       createSession(mySessionId)
//       createToken()
//     }
    
//   function createSession(sessionId) {
//     axios({
//       url: OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
//       method: 'post',
//       data: JSON.stringify({ customSessionId: sessionId }),
//       headers:{
//         Authorization : 'Basic' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(res => {
//         console.log(res)
//       })
//       .catch(err => {
//         console.error(err.response.data)
//       })
//   }
//   function createToken(sessionId) {
//     return new Promise((resolve, reject) => {
//       var data = JSON.stringify({});
//       axios
//           .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
//               headers: {
//                   Authorization: 'Basic ' + btoa('OPENVIDUAPP:MY_SECRET'),
//                   'Content-Type': 'application/json',
//               },
//           })
//           .then((response) => {
//               resolve(response.data.token);
//           })
//           .catch((error) => reject(error));
//   });
//   }

//   return (
//     <div>
//       <NavBar></NavBar>
//       <div>
//           {session === null ? (
//               <div id="join">
//                   <div id="join-dialog">
//                       <h1> Join a video session </h1>
//                       <form onSubmit={e => joinSession(e)}>
//                           <p>
//                               <label>Participant: </label>
//                               <input
//                                   type="text"
//                                   id="userName"
//                                   value={myUserName}
//                                   onChange={e => setMyUserName(e.target.value)}
//                                   required
//                               />
//                           </p>
//                           <p>
//                               <label> Session: </label>
//                               <input
//                                   type="text"
//                                   id="sessionId"
//                                   value={mySessionId}
//                                   onChange={e => setMySessionId(e.target.value)}
//                                   required
//                               />
//                           </p>
//                           <p>
//                               <input name="commit" type="submit" value="JOIN" />
//                           </p>
//                       </form>
//                   </div>
//               </div>
//           ) : (
//               <div id="session">
//                   <OpenViduSession
//                       id="opv-session"
//                       sessionName={mySessionId}
//                       user={myUserName}
//                       token={token}
//                       joinSession={console.log('Join session')}
//                       leaveSession={setSession(null)}
//                       error={console.log('Leave session')}
//                   />
//               </div>
//           )}
//       </div>
//     </div>
//   );
// }

// export default LivePage;