package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.MessagePostReq;
import com.ssafy.soldsolve.db.entity.Message;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.MessageRepository;
import com.ssafy.soldsolve.db.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    RequestRepository requestRepository;

    @Override
    public List<Message> findAll(User user) {
        return messageRepository.findAllByUser(user, Sort.by("writtenTimes").ascending());
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
    public void createLog(User user, String log) {
        Message message = new Message();
        message.setUser(user);
        message.setContent(log);
        message.setIsRead(false);
        messageRepository.save(message);
    }

    @Override
    public int CountIsReadMessage(User user) {
        return (int) messageRepository.countByIsReadAndUser(false,user);
    }


    ////////////////////////////////

    @Override
    public String requestLog(User user, Product p) {
        String log = user.getNickname() + "(" + user.getUserid() + ") 님이 " + p.getTitle() + "(" + p.getNo() + ")에 라이브를 요청했습니다. " +
                "[현재 총 라이브 요청 인원 : " + requestRepository.countByProduct(p) +"명 ]";
        return log;
    }

    @Override
    public String roomLog(User user) {
        String log = user.getNickname() + "(" + user.getUserid() + ")이 채팅을 요청했습니다." ;
        return log;
    }

    @Override
    public String liveLog(Product product) {
        String log = "찜한 상품 " + product.getTitle() + "의 라이브 방송이 시작했습니다.";
        return log;
    }

    @Override
    public String liveTimeLog(Product product) {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String time = simpleDateFormat.format(product.getLiveTime());

        String log = "라이브 요청 상품 " + product.getTitle() + "의 라이브가 " + time + "에 시작합니다." ;
        return log;
    }


}
