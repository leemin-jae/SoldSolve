package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    @ColumnDefault("3.0")
    private double score;

    private String content;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="reviewer_id")
    User reviewer;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="reviewee_id")
    User reviewee;

}
