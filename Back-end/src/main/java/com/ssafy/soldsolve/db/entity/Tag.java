package com.ssafy.soldsolve.db.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    @Column(name = "tag_id")
    private int id;

    private String name;

    @OneToMany(mappedBy = "tag")
    private List<TagProduct> tagProducts;

}
