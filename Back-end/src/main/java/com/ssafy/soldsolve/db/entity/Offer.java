package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "offer_id")
    int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_pk")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "no")
    private Product product;

    private int price;

    @CreationTimestamp
    private Timestamp time;
}
