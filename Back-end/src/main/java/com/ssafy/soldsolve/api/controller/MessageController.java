package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.MessagePostReq;
import com.ssafy.soldsolve.api.service.MessageService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.Message;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    UserService userService;
    @Autowired
    MessageService messageService;

    // 안 읽은 메세지 갯수
    @GetMapping("/count")
    public ResponseEntity<?> getIsReadMessage(Authentication authentication) {
        try{
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            String userId = userDetails.getUsername();
            User user = userService.getUserByUserId(userId);

            int isReadMessage = messageService.CountIsReadMessage(user);

            return ResponseEntity.status(200).body(isReadMessage);
        }catch (Exception e){
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "에러 발생"));
        }

    }

    // 자기 메시지 조회
    @GetMapping("")
    public ResponseEntity<?> selectMessage(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        return ResponseEntity.status(200).body(messageService.findAll(user));
    }
    // 메시지 생성
    @PostMapping("")
    public ResponseEntity<? extends BaseResponseBody> createMessage(@RequestBody MessagePostReq registerInfo) {
        messageService.createMessage(registerInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 메시지 조회
    @PutMapping("/{messageId}")
    public ResponseEntity<?> readMessage(
            @PathVariable int messageId,
            @RequestBody MessagePostReq messageInfo) {
        Message message = messageService.getMessage(messageId);
        messageService.readMessage(messageInfo, message);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 메시지 수정
    @PatchMapping("{messageId}")
    public ResponseEntity<?> updateMessage(
            @PathVariable int messageId,
            @RequestBody MessagePostReq messageInfo){
        Message message = messageService.getMessage(messageId);
        messageService.updateMessage(messageInfo, message);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 메시지 삭제
    @DeleteMapping("/{messageId}")
    public ResponseEntity<?> deleteMessage(@PathVariable int messageId){
        messageService.deleteMessage(messageId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
