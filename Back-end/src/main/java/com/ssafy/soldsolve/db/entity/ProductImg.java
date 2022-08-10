package com.ssafy.soldsolve.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ProductImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    private int pid;

    private String path;

    @ManyToOne
    @JoinColumn(name = "no")
    @JsonIgnore
    private Product no;

}
