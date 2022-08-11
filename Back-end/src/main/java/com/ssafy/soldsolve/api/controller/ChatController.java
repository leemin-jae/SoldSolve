package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.request.ChatMessage;
import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.repository.ChatRepository;
import com.ssafy.soldsolve.db.repository.RoomRepository;
import com.ssafy.soldsolve.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.security.MessageDigest;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;


    @Autowired
    ChatRepository MessageRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    UserRepository userRepository;

//      /pub/chat/message/
    @MessageMapping("/chat/message/")
    public void message(ChatMessage message) {
        Chat chat = new Chat();
        chat.setChatContent(message.getMessage());
        Room r = roomRepository.getOne(message.getRoomId());
        System.out.println(r.getRoomId());
        chat.setRoom(r);
        chat.setWriteUser(userRepository.findByUserid(message.getSender()));
        MessageRepository.save(chat);

        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}

















