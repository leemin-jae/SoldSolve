// 참고용 컴포넌트에요~ 마무리 할 때 지울게요!

import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { v4 as uuid } from 'uuid';

import TopNavigation from '../../components/Common/TopNavigation/TopNavigation';
import { ReactComponent as SendIcon } from '../../assets/send.svg';
import colors from '../../constants/colors';
import commonStyle from '../../constants/commonStyle';
import { useGlobalContext } from '../../contexts/GlobalContext';
import Main from '../../components/Common/Main/Main';
import Message from '../../components/Chat/Message';
import Date from '../../components/Chat/Date';
import * as ChatApi from '../../api/chat';

let stompClient = null;
const ChatRoom = () => {
  const inputRef = useRef(null);
  const [message, setMessage] = useState('');
  const { state } = useLocation();
  const [roomId, setRoomId] = useState(state.roomId);
  const [receiverId, setReceiverId] = useState(state.receiverId);
  // todo: 유저정보 컨텍스트에서 가져와야함.
  const [userId, setUserId] = useState('myId');
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const sendChatHandler = () => {
    console.log('채팅전송개발중');
    if (stompClient) {
      const chatMessage = {
        senderId: userId,
        receiverId: receiverId,
        roomId: roomId,
        message,
      };
      stompClient.send('/app/chat/message', {}, JSON.stringify(chatMessage));
    }
    setMessage('');
    inputRef.current.focus();
  };

  const onMessageReceived = payload => {
    let payloadData = JSON.parse(payload.body);
    chats.push(payloadData);
    setChats([...chats]);
  };

  const onError = err => {
    console.log(err);
    throw err;
  };
  const onConnected = () => {
    console.log('연결완료');
    stompClient.subscribe(`/topic/chat/room/${roomId}`, onMessageReceived);
  };

  const { setHasBottom } = useGlobalContext();
  useEffect(() => {
    setHasBottom(true);
    return () => {
      setHasBottom(false);
    };
  }, []);

  // roomId에 따라 채팅로그 받아오기
  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        const data = await ChatApi.getChagLogs(roomId);
        setChats(data);
      } catch (err) {
        console.log(err);
      }
    };
    const findRoom = async () => {
      try {
        const { roomId } = await ChatApi.findRoom(receiverId);
        setRoomId(roomId);
      } catch (err) {
        console.log(err);
      }
    };
    if (roomId) {
      fetchChatLogs();
    } else {
      findRoom();
    }
  }, [roomId]);

  // 소켓연결
  useEffect(() => {
    let Sock = new SockJS(process.env.REACT_APP_SOCKET_URI);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);

    return () => {
      if (stompClient.connected) stompClient.disconnect();
    };
  }, []);
  let lastChatDate;
  return (
    <>
      <TopNavigation backClick onBackClick={() => navigate(-1)} centerContent={receiverId} />
      <Main>
        {chats.map(chat => {
          const messageEl = (
            <Message
              key={uuid()}
              message={chat.message}
              isMine={chat.senderId === userId}
              sendTime={chat.sendTime}
              isRead={chat.isRead}
            />
          );
          if (chat.sendTime !== lastChatDate) {
            lastChatDate = chat.sendTime;
            return (
              <>
                <Date date={chat.sendTime} key={uuid()} />
                {messageEl}
              </>
            );
          }
          return messageEl;
        })}
      </Main>
      <div
        className="input-wrapper"
        css={css`
                position: fixed;
                bottom: 0;
                width: 100%;
                max-width: 1200px;
                height: ${commonStyle.bottomHeaderHeight};
                box-shadow: 0 -0.2px ${colors.text};
                background-color: ${colors.white};
                display: flex;
                justify-content: center;
                align-items: center;
            `}
      >
        <input
          ref={inputRef}
          value={message}
          onChange={e => setMessage(e.target.value)}
          type="text"
          placeholder="메시지를 입력하세요"
          css={css`
                    width: 90%;
                    padding: 10px 45px 10px 10px;
                    border: 2px solid ${colors.text};
                    font-size: 16px;
                    font-family: 'Regular';
                    border-radius: 31px;
                    &:active,
                    &:focus {
                        outline: none;
                    }
                `}
        />
        <div
          css={css`
                    position: absolute;
                    right: 5%;
                    padding: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `}
        >
          <SendIcon onClick={sendChatHandler} width="28" height="28" fill={colors.text} />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;