package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.request.LiveCreatePostReq;
import com.ssafy.soldsolve.api.service.ChatService;
import com.ssafy.soldsolve.api.service.LiveService;
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
@RequestMapping("api/live")
public class LiveController {


    @Autowired
    UserService userService;

    @Autowired
    LiveService liveService;



    @PostMapping("")
    public ResponseEntity<?> createLive(@RequestBody LiveCreatePostReq req, Authentication authentication){

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        try{
            String sessionId = liveService.createLive(req,user);
            return  ResponseEntity.status(200).body(liveService.getLive(sessionId));
        }catch (Exception e){
            return  ResponseEntity.status(200).body(BaseResponseBody.of(400, "등록 실패"));
        }
    }

    @GetMapping("")
    public ResponseEntity<?> createLive(@RequestParam String sessionId){
        try{
            return  ResponseEntity.status(200).body(liveService.getLive(sessionId));
        }catch (Exception e){
            return  ResponseEntity.status(200).body(BaseResponseBody.of(400, "실패"));
        }
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteLive(@RequestParam String sessionId){
        try{
            liveService.deleteLive(sessionId);
            return  ResponseEntity.status(200).body(BaseResponseBody.of(200, "삭제 성공"));
        }catch (Exception e){
            return  ResponseEntity.status(200).body(BaseResponseBody.of(400, "삭제 실패"));
        }
    }
}



















