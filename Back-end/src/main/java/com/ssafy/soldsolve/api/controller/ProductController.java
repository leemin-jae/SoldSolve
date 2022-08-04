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
@RequestMapping("/api/product")
public class ProductController {


    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<?> listProduct(@RequestParam(required = false) String title) {
        System.out.println("TITLE : " + title);
        try {
            List<Product> result=null;
            if (title == null) {
                result=productService.searchAllProduct();
            } else if (title != null) {
                result=productService.searchByTitleProduct(title);
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
    public ResponseEntity<?> registProduct(@RequestBody ProductPostReq product, Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        product.setUserId(userId);

        System.out.println("등록 : " + product);
        try {


            return new ResponseEntity<Product>(productService.getProduct(Integer.toString(productService.registProduct(product))), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<String>("등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{no}")
    public ResponseEntity<?> getProduct(@PathVariable("no") String no){


        try {
            Product product  = productService.getProduct(no);

            if(product != null) {
                return new ResponseEntity<Product>(product, HttpStatus.OK);
            }else{
                return new ResponseEntity<String>("수정 실패", HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PatchMapping("/{no}")
    public ResponseEntity<?> updateProduct(@PathVariable("no") String no, @RequestBody ProductPostReq product, Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        product.setUserId(userId);

        try {
            if(productService.updateProduct(no,product) == 1) {
                return new ResponseEntity<Product>(productService.getProduct(no), HttpStatus.OK);
            }else{
                return new ResponseEntity<String>("수정 실패", HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<?> deleteProduct(@PathVariable("no") String no) {
        try {
            productService.deleteProduct(no);
            return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<String>("삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}