package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.RoomRead;
import com.ssafy.soldsolve.db.repository.ChatRepository;
import com.ssafy.soldsolve.db.repository.RoomReadRepository;
import com.ssafy.soldsolve.db.repository.RoomRepository;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    ChatRepository chatRepository;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    RoomReadRepository roomReadRepository;
    @Override
    public List<Chat> getChat(int no, String userId) {
        Room r = roomRepository.getOne(no);

        RoomRead read = roomReadRepository.findByRoom(r);

        if(r.getSeller().getUserid().equals(userId)){
            read.setSellerChat(read.getTotalChat());
        }
        if(r.getBuyer().getUserid().equals(userId)){
            read.setBuyerChat(read.getTotalChat());
        }

        roomReadRepository.save(read);


        return chatRepository.findAllByRoom(r);
    }
}
