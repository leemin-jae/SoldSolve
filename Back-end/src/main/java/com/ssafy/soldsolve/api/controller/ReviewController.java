package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.ReviewPostReq;
import com.ssafy.soldsolve.api.service.ReviewService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @Autowired
    UserService userService;

    // 이미 있는지 조회하기 -> true라면 수정하기(PATCH) / false라면 생성하기(POST)
    @GetMapping("/check/{userPk}")
    public ResponseEntity<?> checkReview(Authentication authentication, @PathVariable int userPk) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User reviewer = userService.getUserByUserId(userId);
        User reviewee = userService.getUserByUserPk(userPk);
        boolean flag = reviewService.checkReview(reviewer, reviewee);
        return ResponseEntity.status(200).body(flag);
    }

    // 리뷰 생성
    @PostMapping("{userPk}")
    public ResponseEntity<? extends BaseResponseBody> createReview(
            Authentication authentication,
            @PathVariable int userPk,
            @RequestBody ReviewPostReq Info) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User reviewer = userService.getUserByUserId(userId);
        User reviewee = userService.getUserByUserPk(userPk);
        if (reviewService.createReview(reviewer, reviewee, Info)==true) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } return ResponseEntity.status(200).body(BaseResponseBody.of(400, "이미 등록된 리뷰입니다"));
    }

    // 리뷰 수정

    // 리뷰 삭제
//    @DeleteMapping("{reviewId}")
//    public ResponseEntity<? extends BaseResponseBody> deleteReview(
//            Authentication authentication,
//            @PathVariable int reviewId) {
//        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
//        String userId = userDetails.getUsername();
//        User reviewer = userService.getUserByUserId(userId);
//        if (reviewService.findReview(reviewer, reviewId)==true) {
//            reviewService.deleteReview(reviewId);
//            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//        } return ResponseEntity.status(200).body(BaseResponseBody.of(400, "없는 리뷰입니다."));
//    }
}