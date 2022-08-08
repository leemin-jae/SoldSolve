package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.api.service.WishService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.entity.Wish;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishes")
public class WishController {

    @Autowired
    WishService wishService;

    @Autowired
    UserService userService;

    // 로그인한 유저 찜한 상품 추가
    @PostMapping("")
    public ResponseEntity<? extends BaseResponseBody> createWishProduct(Authentication authentication, @RequestParam(name = "product") int product) {
        try {
            SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
            String userId = userDetails.getUsername();
            User user = userService.getUserByUserId(userId);
            wishService.createWishProduct(user, product);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(400, "이미 추가된 상품입니다."));

    }

    // 로그인한 유저의 찜한 상품 조회
    @GetMapping("")
    public ResponseEntity<?> readWishProduct(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        List<Wish> wishList = wishService.getWishProduct(user);
        return ResponseEntity.status(200).body(wishList);
    }

    // 로그인한 유저의 찜한 상품 삭제
    @DeleteMapping("")
    public ResponseEntity<? extends BaseResponseBody> deleteWishProduct(Authentication authentication, @RequestParam(name = "product") int product) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        wishService.deleteWishProduct(user, product);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 찜한 상품인지 체크 ( 빨간색 or 빈하트 구분용 )
    @GetMapping("/check/{product}")
    public ResponseEntity<?> checkWishProduct(@PathVariable int product, Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Boolean flag = false;
        flag = wishService.checkWishProduct(user, product);
        return ResponseEntity.status(200).body(flag);
    }
}
