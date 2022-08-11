package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    private int no;

    private String title; // 상품 이름
    private String content; // 상품 설명
    private int price; // 가격

    private String region; // 지역 테이블 -> 도시????
    private String category; // 카테고리 -> table 생성 후 외래키

    //private String productImg; // 상품 사진 여러개
    @ColumnDefault("0")
    private int state;       // 상품 상태 0 : 판매중, 1 : 거래 완료


    @OneToMany(mappedBy = "no")
    List<ProductImg> productImg = new ArrayList<>();

    private int viewCount;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    private User user;







}
