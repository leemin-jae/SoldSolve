package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.MessagePostReq;
import com.ssafy.soldsolve.db.entity.Message;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Override
    public List<Message> findAll(User user) {
        return messageRepository.findAllByUser(user, Sort.by("writtenTimes").descending());
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

    @Override
    public void createLog(User requester, Product p) {
        Message message = new Message();
        String requesterNickname = requester.getNickname();
        String productTitle = p.getTitle();
        String log = String.format("%s님이 %s 상품에 라이브를 요청했습니다.", requesterNickname, productTitle);
        User requestedUser = p.getUser();
        message.setUser(requestedUser);
        message.setContent(log);
        message.setIsRead(false);
        messageRepository.save(message);
    }
}
