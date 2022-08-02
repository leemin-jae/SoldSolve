package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.api.service.ProductService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.db.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping()
public class ProductController {


    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<?> searchNotice(@RequestParam(required = false) String no, @RequestParam(required = false) String nickName,
                                          @RequestParam(required = false) String title) {
        System.out.println("ID : " + nickName);
        System.out.println("TITLE : " + title);
        System.out.println("No : " + no);
        try {
            List<Product> result=null;
            if (nickName == null && title == null &&no==null) {
                result=productService.searchAllProduct();
            } else if (nickName != null) {
                result=productService.searchByNickNameProduct(nickName);
            } else if (title != null) {
                result=productService.searchByTitleProduct(title);
            }else if(no!=null){
                result = new ArrayList<>();
                result.add(productService.searchByNoProduct(Integer.parseInt(no)));
            }
            if(result==null) {
                return new ResponseEntity<String>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
            }else if(result.size()==0) {
                return new ResponseEntity<String>("조회된 내용이 없습니다.", HttpStatus.NO_CONTENT);
            }else {
                return new ResponseEntity<List<Product>>(result, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<String>("조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("")
    public ResponseEntity<?> registNotice(@RequestBody ProductPostReq product, Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        product.setUserId(userId);

        System.out.println("등록 : " + product);
        try {
            productService.registProduct(product);
            return new ResponseEntity<String>("등록 성공", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<String>("등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("")
    public ResponseEntity<?> updateNotice(@RequestBody ProductPostReq product, Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        product.setUserId(userId);

        if(product.getNo() == 0){
            return new ResponseEntity<String>("수정 실패", HttpStatus.NO_CONTENT);
        }

        try {
            if(productService.updateProduct(product) == 1) {
                return new ResponseEntity<String>("수정 성공", HttpStatus.OK);
            }else{
                return new ResponseEntity<String>("수정 실패", HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteNotice(@RequestParam String no) {
        try {
            productService.deleteProduct(no);
            return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<String>("삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
