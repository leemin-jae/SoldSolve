package com.ssafy.soldsolve.api.service;


import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.User;

import java.util.List;

public interface RoomService {


    int createRoom(User sellerUser, User buyerUser);

    List<Room> roomList(User user);

    void deleteRoom(String no, User user);

    int findDuplicate(User buyerUser, User sellerUser);
}
