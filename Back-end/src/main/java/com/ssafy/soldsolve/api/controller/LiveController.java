package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.request.LiveCreatePostReq;
import com.ssafy.soldsolve.api.service.*;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.*;
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

    @Autowired
    RequestService requestService;

    @Autowired
    MessageService messageService;

    @Autowired
    ProductService productService;



    @GetMapping("/list")
    public ResponseEntity<?> liveList(){
        try{
            return  ResponseEntity.status(200).body(liveService.getList());
        }catch (Exception e){
            return  ResponseEntity.status(200).body(BaseResponseBody.of(400, "실패"));
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createLive(@RequestBody LiveCreatePostReq req, Authentication authentication){

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        try{
            String sessionId = liveService.createLive(req,user);


            List<Request> l = requestService.getUserList(productService.getProduct(req.getProductNo()));
            if(l != null) {
                for (Request r : l) {
                    String log = messageService.liveLog(r.getProduct());
                    messageService.createLog(r.getUser(), log);
                }
            }

            return  ResponseEntity.status(200).body(liveService.getLive(sessionId));
        }catch (Exception e){
            return  ResponseEntity.status(200).body(BaseResponseBody.of(400, "등록 실패"));
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getLive(@RequestParam String sessionId){
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



















