package com.ssafy.soldsolve.db.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Deal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dealId;

    @ManyToOne
    @JoinColumn(name="buyer_id")
    User buyer;

    @ManyToOne
    @JoinColumn(name="product_id")
    Product product;

}
