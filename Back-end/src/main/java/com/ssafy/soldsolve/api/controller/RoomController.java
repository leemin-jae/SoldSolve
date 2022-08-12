package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.service.ChatService;
import com.ssafy.soldsolve.api.service.RoomService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

        int num = roomService.findDuplicate(buyerUser, sellerUser);
        if(num == -1){
            return ResponseEntity.status(200).body(roomService.createRoom(sellerUser, buyerUser));
        }else{
            return ResponseEntity.status(200).body(num);
        }


    }

    @GetMapping("")
    public ResponseEntity<?> roomList(Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        return ResponseEntity.status(200).body(roomService.roomList(user));
    }

    @GetMapping("/{no}")
    public ResponseEntity<?> getChat(@PathVariable("no") String no , Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();

        List<Chat> chat = chatService.getChat(Integer.parseInt(no),userId);
        return ResponseEntity.status(200).body(chat);
    }



    @DeleteMapping("/{no}")
    public ResponseEntity<?> deleteRoom(@PathVariable("no") String no, Authentication authentication){

        try{
            SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
            String userId = userDetails.getUsername();
            User user = userService.getUserByUserId(userId);


            roomService.deleteRoom(no, user);
        }catch (Exception e){
            return  ResponseEntity.status(200).body(BaseResponseBody.of(400, "삭제 실패"));
        }
        return  ResponseEntity.status(200).body(BaseResponseBody.of(200, "삭제 성공"));
    }

}

















