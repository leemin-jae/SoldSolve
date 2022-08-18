package com.ssafy.soldsolve.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
@NoArgsConstructor
public class TagProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "tag_product_id")
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "tag_id")
    @JsonIgnore
    private Tag tag;

    private String name;



}
