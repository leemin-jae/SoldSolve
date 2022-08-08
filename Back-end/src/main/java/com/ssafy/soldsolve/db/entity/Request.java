package com.ssafy.soldsolve.db.entity;

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
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "no")
    private Product product;
}
