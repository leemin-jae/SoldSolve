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

    void createLog(User user , String log);
    void readMessage(MessagePostReq messagePostReq, Message message);

    void updateMessage(MessagePostReq messagePostReq, Message message);

    void deleteMessage(int messageId);

    String requestLog(User user, Product p);

    String roomLog(User user);

    String liveLog(Product product);

    int CountIsReadMessage(User user);
}
