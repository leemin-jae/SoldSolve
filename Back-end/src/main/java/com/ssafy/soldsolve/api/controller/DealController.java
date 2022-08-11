package com.ssafy.soldsolve.api.controller;


import com.ssafy.soldsolve.api.service.DealService;
import com.ssafy.soldsolve.api.service.ProductService;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.db.entity.Deal;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deal")
public class DealController {

    @Autowired
    UserService userService;

    @Autowired
    DealService dealService;

    @Autowired
    ProductService productService;

    @GetMapping("/buy")  // 구매 물건 확인
    public ResponseEntity<?> getBuyList(Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        try {
            List<Deal> p = dealService.getBuyProduct(user);
            if (p == null) {
                return new ResponseEntity<String>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
            } else if (p.size() == 0) {
                return new ResponseEntity<String>("조회된 내용이 없습니다.", HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<List<Deal>>(p, HttpStatus.OK);
            }
        }catch  (Exception e) {
            return new ResponseEntity<String>("조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



    @PostMapping("")  // 구매 확정
    public ResponseEntity<?> createDeal(Authentication authentication,@RequestParam String no){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();

        try {
            User buy = userService.getUserByUserId(userId);
            Product p = productService.getProduct(no);

            if(buy == null){
                return new ResponseEntity<String>("구매자를 찾을수 없습니다", HttpStatus.BAD_REQUEST);
            }else if(p == null){
                return new ResponseEntity<String>("물품을 찾을 수 없습니다", HttpStatus.BAD_REQUEST);
            }else{
                dealService.createDeal(buy,p);
                return new ResponseEntity<String>("거래가 완료되었습니다", HttpStatus.OK);

            }

        }catch  (Exception e) {
            return new ResponseEntity<String>("거래 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}

















