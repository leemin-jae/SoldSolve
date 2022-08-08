package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.OfferPostReq;
import com.ssafy.soldsolve.api.service.OfferService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.Offer;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    @Autowired
    OfferService offerService;

    @Autowired
    UserService userService;

    @Autowired
    ProductRepository productRepository;

    // 로그인한 유저가 가격을 제안하는 기능
    @PostMapping("/{no}")
    public ResponseEntity<? extends BaseResponseBody> createWishProduct(
            Authentication authentication,
            @PathVariable int no,
            @RequestBody OfferPostReq Info) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        if (offerService.createOffer(user, no, Info)==true) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else return ResponseEntity.status(200).body(BaseResponseBody.of(400, "없는 상품입니다"));
    }

    // 상품에게 제안된 가격들을 리스트로 나열하는 기능 ( 만약 유저아이디가 상품 판매 아이디와 같다면, 채팅 기능 추가 )
    @GetMapping("/pricelist/{no}")
    public ResponseEntity<?> getOffer(
            Authentication authentication,
            @PathVariable int no) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Product offeredProduct = productRepository.findByNo(no);
        List<Offer> offerList = offerService.getOfferList(offeredProduct);
        return ResponseEntity.status(200).body(offerList);
    }
}
