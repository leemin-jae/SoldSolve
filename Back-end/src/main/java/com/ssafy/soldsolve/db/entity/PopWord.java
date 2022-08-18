package com.ssafy.soldsolve.db.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class
PopWord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pop_id")
    public int popId;

    private String title;

    private int count;

}
