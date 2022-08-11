package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
public class
Live {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_id")
    public int id;

    private String sessionId;

    private String title;

    private String content;

    @OneToOne
    @JoinColumn(name = "product_id")
    Product product;




}
