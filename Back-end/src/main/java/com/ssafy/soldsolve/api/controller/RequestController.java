package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.service.MessageService;
import com.ssafy.soldsolve.api.service.ProductService;
import com.ssafy.soldsolve.api.service.RequestService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.Request;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    RequestService requestService;

    @Autowired
    UserService userService;

    @Autowired
    ProductService productService;

    @Autowired
    MessageService messageService;

    // 로그인한 유저 라이브 요청 추가
    @PostMapping("/{product}")
    public ResponseEntity<? extends BaseResponseBody> createRequest(Authentication authentication, @PathVariable int product) {
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            String userId = userDetails.getUsername();
            User user = userService.getUserByUserId(userId);
            requestService.createRequest(user, product);
            // 상품
            Product p = productService.getProductByNo(product);

            String log = messageService.requestLog(user, p);
            messageService.createLog(p.getUser(), log);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(400, "이미 요청된 라이브입니다."));

    }

    // 로그인한 유저의 라이브 요청 조회
    @GetMapping("")
    public ResponseEntity<?> readRequest(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        List<Request> requestList = requestService.getRequest(user);
        return ResponseEntity.status(200).body(requestList);
    }

    // 로그인한 유저의 라이브 요청 삭제
    @DeleteMapping("{product}")
    public ResponseEntity<? extends BaseResponseBody> deleteRequest(
            Authentication authentication,
            @PathVariable int product) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        requestService.deleteRequest(user, product);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 라이브 요청 체크 ( 빨간색 or 빈하트 구분용 )
    @GetMapping("/check/{product}")
    public ResponseEntity<?> checkRequest(@PathVariable int product, Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Boolean flag = false;
        flag = requestService.checkRequest(user, product);
        return ResponseEntity.status(200).body(flag);
    }

    // 상품 id를 기준으로 라이브 요청 유저들 가져오기
    @GetMapping("{product}")
    public ResponseEntity<?> getRequestList(@PathVariable int product) {
        Product p = productService.getProductByNo(product);
        List<Request> request = requestService.getUserList(p);
        return ResponseEntity.status(200).body(request);
    }
}

