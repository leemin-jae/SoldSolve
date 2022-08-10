import React, { useState, useEffect } from "react";

const LiveChat = (props) => {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");


    const handleChange = (event) => {
        setMessage(event.target.value);
      };
      useEffect(() => {
        console.log("here");
        props.props.session.on("signal:chat", (event) => {
          const data = JSON.parse(event.data);
          console.log(event);
          console.log(data);
          let messageListData = messageList;
          messageListData.push({
            connectionId: event.from.connectionId,
            nickname: data.nickname,
            message: data.message,
          });
          setMessageList([...messageListData]);
          console.log(messageList);
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
            console.log("chat" + data);
            props.props.session.signal({
              data: JSON.stringify(data),
              type: "chat",
            });
          }
        }
        setMessage("");
      };
    console.log(props.props.myUserName)
    console.log(props.props.session)

  
    return (
      <>
        <div className=''>
          <div className=''>
            <span>채팅창</span>
          </div>
          <div className=''>
            {messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className=''
              >
                <canvas
                  id={"userImg-" + i}
                  width="60"
                  height="60"
                  className=''
                />
                <div className=''>
                  <div className=''>
                    <p className=''>{data.nickname}</p>
                  </div>
                  <div className=''>
                    <p className=''>{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          <div>
            <input
              placeholder="메세지를 입력하세요"
              id="chatInput"
              value={message}
              onChange={handleChange}
              onKeyPress={handlePressKey}
              autoComplete="off"
            />
            <div>
              <button onClick={sendMessage} >전송</button>
            </div>
          </div>
        </div>
      </>
    );
    
};

export default LiveChat;