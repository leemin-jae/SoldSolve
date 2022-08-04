package com.ssafy.soldsolve.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class ProductPostReq {

    private String title; // 상품 이름
    private String content; // 상품 설명
    private int price; // 가격

    private String region; // 지역 테이블 -> 도시????
    private String category; // 카테고리 -> table 생성 후 외래키

    private String productImg; // 상품 사진 여러개
    private String userId;


}
