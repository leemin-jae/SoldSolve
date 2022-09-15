package com.ssafy.soldsolve.db.entity;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
public class Wish {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_id")
    int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "no")
    private Product product;

}
