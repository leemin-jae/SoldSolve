package com.ssafy.soldsolve.db.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.checkerframework.checker.units.qual.A;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data

public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;

    @ManyToOne
    @JoinColumn(name="buyer_id")
    private User buyer;

    @ManyToOne
    @JoinColumn(name="seller_id")
    private User seller;

    private int isRead;

    @OneToMany(mappedBy = "room" , orphanRemoval = true , cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Chat> chat = new ArrayList<>();

    @JsonIgnore
    private int buyerOut;

    @JsonIgnore
    private int sellerOut;

    @JsonIgnore
    private int inUser;   // 0, 1, 2 현재 채팅방에 들어와 있는 유저 수

    @OneToOne(mappedBy = "room" , cascade = CascadeType.ALL)
    @JsonIgnore
    private RoomRead roomRead;

}
