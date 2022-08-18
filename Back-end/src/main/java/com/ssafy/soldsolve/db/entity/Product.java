package com.ssafy.soldsolve.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
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


    @OneToMany(mappedBy = "no",cascade = CascadeType.ALL)
    List<ProductImg> productImg = new ArrayList<>();

    private int viewCount;

    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp liveTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    private User user;


    /////////////////

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<Request> requestsUser = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<TagProduct> tag = new ArrayList<>();

    /////////////////////

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Offer> offers = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Deal> deals = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Wish> wishes = new ArrayList<>();


}
