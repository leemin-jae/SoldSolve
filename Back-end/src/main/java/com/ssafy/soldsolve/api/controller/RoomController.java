package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.response.UserLoginPostRes;
import com.ssafy.soldsolve.api.service.ChatService;
import com.ssafy.soldsolve.api.service.RoomService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/room")
public class RoomController {

    @Autowired
    RoomService roomService;

    @Autowired
    UserService userService;
    @Autowired
    ChatService chatService;


    @PostMapping("")
    public ResponseEntity<?> createRoom(@RequestParam String seller, Authentication authentication){

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User buyerUser = userService.getUserByUserId(userId);
        User sellerUser = userService.getUserByUserId(seller);
        if(sellerUser == null){
            return  ResponseEntity.status(200).body(BaseResponseBody.of(400, "없는 유저"));
        }

        return ResponseEntity.status(200).body(roomService.createRoom(sellerUser, buyerUser));
    }

    @GetMapping("")
    public ResponseEntity<?> roomList(Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);



        return ResponseEntity.status(200).body(roomService.roomList(user));
    }

    @GetMapping("/{no}")
    public ResponseEntity<?> getChat(@PathVariable("no") String no){
        List<Chat> chat = chatService.getChat(Integer.parseInt(no));
        return ResponseEntity.status(200).body(chat);
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<?> deleteRoom(){

        return null;
    }

}

















