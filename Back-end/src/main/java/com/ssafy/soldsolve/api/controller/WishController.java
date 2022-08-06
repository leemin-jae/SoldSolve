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
@RequestMapping("/soldsolve/wish")
public class WishController {

    @Autowired
    WishService wishService;

    @Autowired
    UserService userService;

// 로그인한 유저 찜한 상품 추가
    @PostMapping("")
    public ResponseEntity<? extends BaseResponseBody> createWishProduct(Authentication authentication, @RequestParam(name = "product") int product) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        wishService.createWishProduct(user, product);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    로그인한 유저의 찜한 상품 조회
    @GetMapping("")
    public ResponseEntity<?> readWishProduct(Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        List<Wish> wishList = wishService.getWishProduct(user);
        return ResponseEntity.status(200).body(wishList);
    }
}
