package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.ReviewPostReq;
import com.ssafy.soldsolve.api.service.ReviewService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.Review;
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

    // 서로 채팅 쳤는지 확인하기
    @GetMapping("/checkChat/{userPk}")
    public ResponseEntity<?> checkChat(Authentication authentication, @PathVariable int userPk) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User reviewer = userService.getUserByUserId(userId);
        User reviewee = userService.getUserByUserPk(userPk);
        boolean flag = reviewService.checkChat(reviewer, reviewee);
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
        // 만약 채팅 내역이 없다면, 만들 수 없음. => 각각 채팅 최소 1회 이상일시만 평가 가능.
        if (reviewService.checkChat(reviewer, reviewee) == true) {
            // 만약, 기존 작성한 리뷰가 있다면 만들 수 없음. -> 리뷰 수정으로
            if (reviewService.checkReview(reviewer, reviewee) == false) {
                reviewService.createReview(reviewer, reviewee, Info);
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            }
            return ResponseEntity.status(200).body(BaseResponseBody.of(400, "이미 등록된 리뷰입니다"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(400, "채팅이 없습니다"));
    }

    // 리뷰 수정
    @PatchMapping("{userPk}")
    public ResponseEntity<?> updateReview(
            Authentication authentication,
            @PathVariable int userPk,
            @RequestBody ReviewPostReq Info) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User reviewer = userService.getUserByUserId(userId);
        User reviewee = userService.getUserByUserPk(userPk);
        Review review = reviewService.getReview(reviewer, reviewee);
        reviewService.updateReview(Info, review, reviewee);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//     리뷰 삭제
    @DeleteMapping("{reviewId}")
    public void deleteReview(@PathVariable int reviewId) {
        reviewService.deleteReview(reviewId);
    }
}