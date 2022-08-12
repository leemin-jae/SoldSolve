package com.ssafy.soldsolve.db.repository;


import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Query(value = "select * from room  where buyer_id = :user and buyer_out != 1",nativeQuery = true)
    List<Room> findByBuyerId(User user);

    @Query(value = "select * from room  where seller_id = :user and seller_out != 1",nativeQuery = true)
    List<Room> findBySellerId(User user);



    Room findByBuyerAndSeller(User buyerUser, User sellerUser);
}
