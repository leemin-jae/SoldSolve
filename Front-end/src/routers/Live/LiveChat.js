import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'


const LiveChat = (props) => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  let store = useSelector((state) => { return state })

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  useEffect(() => {
    props.props.session.on("signal:chat", (event) => {
      const data = JSON.parse(event.data);
      let messageListData = messageList;
      messageListData.push({
        connectionId: event.from.connectionId,
        nickname: data.nickname,
        message: data.message,
      });
      setMessageList([...messageListData]);
    });
    const welcome = {
      message: `${props.props.myUserName}님이 입장하셨습니다.`,
      nickname: props.props.myUserName,
      streamId: props.props.streamId,
    };
    console.log(welcome)
    props.props.session.signal({
      data: JSON.stringify(welcome),
      type: "chat",
    });
  }, []);


  useEffect(() => {
    // console.log(messageList);
  }, [messageList]);

  const handlePressKey = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    console.log("chat" + message);
    if (props.props.myUserName && message) {
      let messageData = message.replace(/ +(?= )/g, "");
      if (messageData !== "" && messageData !== " ") {
        const data = {
          message: messageData,
          nickname: props.props.myUserName,
          streamId: props.props.streamId,
        };
        console.log(data)
        props.props.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    setMessage("");
  };


  return (
    <>
      <h3 style={{ marginInline: '1rem' }}>채팅방</h3>
      <div className='chatbox'>
        <div className=''>
          {messageList.map((data, i) => (
            <div
              key={i}
              id="remoteUsers"
              className=''
            >
              {store.info.info.nickName === data.nickname ?
                <div className='liveChatItem2'>
                  <div className='livechatcontent'>
                    <p className='chatnickname d-flex flex-row-reverse '>{data.nickname}</p>
                    <p className='livechatbox'>{data.message}</p>
                  </div>
                </div>
                :
                <div className='liveChatItem'>
                  <div className='livechatcontent'>
                    <p className='chatnickname'>{data.nickname}</p>
                    <p className='livechatbox'>{data.message}</p>
                  </div>
                </div>
              }

            </div>
          ))}
        </div>

      </div>
      <div className="livechatInput">
        <input
          className="inputform3"
          placeholder="메세지를 입력하세요"
          id="chatInput"
          value={message}
          onChange={handleChange}
          onKeyPress={handlePressKey}
          autoComplete="off"
        />
        <button className="inputsubmitbutton" onClick={sendMessage} >전송</button>
      </div>
    </>
  );

};

export default LiveChat;