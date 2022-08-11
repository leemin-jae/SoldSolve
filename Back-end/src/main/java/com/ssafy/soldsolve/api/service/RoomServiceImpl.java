package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.RoomRepository;
import com.ssafy.soldsolve.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service()
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public int createRoom(User sellerUser, User buyerUser) {
        Room room = new Room();
        room.setSeller(sellerUser);
        room.setBuyer(buyerUser);
        int no = roomRepository.save(room).getRoomId();

        Room r = roomRepository.getOne(no);

        List<Room> sellerList = sellerUser.getRoomList();
        sellerList.add(r);
        sellerUser.setRoomList(sellerList);

        List<Room> buyerList = buyerUser.getRoomList();
        buyerList.add(r);
        buyerUser.setRoomList(buyerList);

        userRepository.save(sellerUser);
        userRepository.save(buyerUser);



        return no;
    }

    @Override
    public List<Room> roomList(User user) {
        List<Room> room = roomRepository.findByBuyerIdOrSellerId(user.getId(),user.getId());
        return room;
    }

    @Override
    public void deleteRoom(String no, User user) {
        Room r = roomRepository.getOne(Integer.parseInt(no));
        int pk = user.getId();

        if(r.getBuyer() != null){
            if(r.getBuyer().getId() == pk){
                r.setBuyer(null);
            }
        }
        if(r.getSeller() != null){
            if(r.getSeller().getId() == pk){
                r.setSeller(null);
            }
        }

        if(r.getSeller() == null && r.getBuyer() == null){
            roomRepository.deleteById(Integer.parseInt(no));
        }else{
            roomRepository.save(r);
        }

    }

    @Override
    public int findDuplicate(User buyerUser, User sellerUser) {
        Room r = roomRepository.findByBuyerAndSeller(buyerUser,sellerUser);
        if(r == null){
            return -1;
        }else{
            return r.getRoomId();
        }
    }
}
