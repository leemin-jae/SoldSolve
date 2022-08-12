package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.MessagePostReq;
import com.ssafy.soldsolve.db.entity.Message;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MessageService {
    List<Message> findAll(User user);
    Message getMessage(int messageId);
    Message createMessage(MessagePostReq registerInfo);

    void createLog(User requester, Product p);
    void readMessage(MessagePostReq messagePostReq, Message message);

    void updateMessage(MessagePostReq messagePostReq, Message message);

    void deleteMessage(int messageId);
}
