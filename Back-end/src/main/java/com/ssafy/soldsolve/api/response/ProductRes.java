package com.ssafy.soldsolve.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.soldsolve.db.entity.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.CascadeType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;



@Getter
@Setter
public class ProductRes {
    private int no;
    private String title; // 상품 이름
    private String content; // 상품 설명
    private int price; // 가격

    private String region; // 지역 테이블 -> 도시????
    private String category; // 카테고리 -> table 생성 후 외래키

    private int state;       // 상품 상태 0 : 판매중, 1 : 거래 완료
    List<ProductImg> productImg = new ArrayList<>();

    private int viewCount;
    @JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
    private Timestamp liveTime;

    private User user;

    List<User> requestsUser = new ArrayList<>();

    List<String> tag = new ArrayList<>();

    public static ProductRes of(Product product) {
        ProductRes res = new ProductRes();
        res.setNo(product.getNo());
        res.setTitle(product.getTitle());
        res.setViewCount(product.getViewCount());
        res.setRegion(product.getRegion());
        res.setPrice(product.getPrice());
        res.setCategory(product.getCategory());
        res.setState(product.getState());
        res.setContent(product.getContent());
        res.setLiveTime(product.getLiveTime());
        res.setUser(product.getUser());

//
//        List<Request> r = requestRepository.findByProduct(product);
//        List<User> requestUser = new ArrayList<>();
//        for(Request now : r){
//            requestUser.add(now.getUser());
//        }

        //requestsUser, tag
        return res;
    }
}
