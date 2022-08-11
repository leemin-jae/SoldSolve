package com.ssafy.soldsolve.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter

public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;

    @ManyToOne
    @JoinColumn(name="buyer_id")
    User buyer;

    @ManyToOne
    @JoinColumn(name="seller_id")
    User seller;


//    @OneToMany(orphanRemoval = true, mappedBy = "chatId")
//    @JsonIgnore
//    List<Chat> chatList = new ArrayList<>();

}
