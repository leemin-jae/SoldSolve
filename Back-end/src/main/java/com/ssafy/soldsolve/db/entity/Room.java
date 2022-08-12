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
    User buyer;

    @ManyToOne
    @JoinColumn(name="seller_id")
    User seller;

    @OneToMany(mappedBy = "room" , orphanRemoval = true , cascade = CascadeType.ALL)
    List<Chat> chat = new ArrayList<>();

    int buyerOut;

<<<<<<< HEAD
//    @OneToMany(orphanRemoval = true, mappedBy = "chatId")
//    @JsonIgnore
//    List<Chat> chatList = new ArrayList<>();
=======
    int sellerOut;
>>>>>>> e38b089f3e69d19cd7b07e32fa35cb85f71c5ac9

}
