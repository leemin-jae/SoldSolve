package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.MessagePostReq;
import com.ssafy.soldsolve.db.entity.Message;

public interface MessageService {
    Message getMessage(int messageId);
    Message createMessage(MessagePostReq registerInfo);

    void readMessage(MessagePostReq messagePostReq, Message message);

    void updateMessage(MessagePostReq messagePostReq, Message message);

    void deleteMessage(int messageId);
}
