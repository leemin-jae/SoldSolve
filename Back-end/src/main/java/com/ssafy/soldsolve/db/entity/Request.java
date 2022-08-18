package com.ssafy.soldsolve.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "no")
    @JsonIgnore
    private Product product;

    private String userid;

    private String nickname;
}
