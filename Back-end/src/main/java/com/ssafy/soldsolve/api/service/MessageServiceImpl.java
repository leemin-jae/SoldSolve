package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.MessagePostReq;
import com.ssafy.soldsolve.db.entity.Message;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Override
    public Page<Message> findAll(User user, int page) {
        return messageRepository.findAllByUser(user, (PageRequest.of(page, 10)));
    }

    @Override
    public Message getMessage(int messageId) {
        return messageRepository.findById(messageId).get();
    }

    @Override
    public Message createMessage(MessagePostReq registerInfo) {
        Message message = new Message();
        message.setContent(registerInfo.getContent());
        message.setUser(registerInfo.getUser());
        message.setIsRead(false);
        return messageRepository.save(message);
    }

    @Override
    public void readMessage(MessagePostReq messagePostReq, Message message) {
        message.setIsRead(true);
        messageRepository.save(message);
    }

    @Override
    public void updateMessage(MessagePostReq messagePostReq, Message message) {
        message.setContent(messagePostReq.getContent());
        message.setUser(messagePostReq.getUser());
        messageRepository.save(message);
    }

    @Override
    public void deleteMessage(int messageId){
        messageRepository.delete(messageRepository.getOne(messageId));
    }
}
