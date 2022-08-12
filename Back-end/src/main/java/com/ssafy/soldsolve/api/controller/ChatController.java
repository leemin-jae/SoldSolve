package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.request.ChatMessage;
import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.RoomRead;
import com.ssafy.soldsolve.db.repository.ChatRepository;
import com.ssafy.soldsolve.db.repository.RoomReadRepository;
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
    ChatRepository chatRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoomReadRepository roomReadRepository;


//      /pub/chat/message/
    @MessageMapping("/chat/message/")
    public void message(ChatMessage message) {

        Room r = roomRepository.getOne(message.getRoomId());

        if(message.getType().equals("JOIN")){
            r.setInUser(r.getInUser() + 1);
            roomRepository.save(r);
            //message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }else if(message.getType().equals("EXIT")){
            r.setInUser(r.getInUser() - 1);
            roomRepository.save(r);
            //message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        }else if(message.getType().equals("TALK")){
            Chat chat = new Chat();
            chat.setChatContent(message.getMessage());
            chat.setRoom(r);
            chat.setWriteUser(userRepository.findByUserid(message.getSender()));

            int no = chatRepository.save(chat).getChatId();
            RoomRead read = roomReadRepository.findByRoom(r);
            read.setTotalChat(no);

            if(r.getInUser() == 2){
                read.setBuyerChat(no);
                read.setSellerChat(no);
            }else{
                if(r.getBuyer().getUserid().equals(message.getSender())){
                    read.setBuyerChat(no);
                }
                if(r.getSeller().getUserid().equals(message.getSender())){
                    read.setSellerChat(no);
                }

            }

            roomReadRepository.save(read);

            messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
        }
    }


}

















