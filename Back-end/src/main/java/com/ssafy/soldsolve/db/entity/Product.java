package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

//@Entity
@Data
@NoArgsConstructor
public class Product {
    private String title; // 상품 이름
    private String content; // 상품 설명
    private int price; // 가격

    private String region; // 지역 테이블 -> 도시????
    private String category; // 카테고리 -> table 생성 후 외래키


    private int viewCount;
}
