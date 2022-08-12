package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.RoomRead;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.RoomReadRepository;
import com.ssafy.soldsolve.db.repository.RoomRepository;
import com.ssafy.soldsolve.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service()
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoomReadRepository roomReadRepository;

    @Override
    public int createRoom(User sellerUser, User buyerUser) {
        Room room = new Room();
        room.setSeller(sellerUser);
        room.setBuyer(buyerUser);
        int no = roomRepository.save(room).getRoomId();

        Room r = roomRepository.getOne(no);

        RoomRead roomRead = new RoomRead();
        roomRead.setRoom(r);
        roomReadRepository.save(roomRead);


        return no;
    }

    @Override
    public List<Room> roomList(User user) {
        List<Room> room = new ArrayList<>();
        List<Room> roomBuy = roomRepository.findByBuyerId(user);
        List<Room> roomSell = roomRepository.findBySellerId(user);
        RoomRead rr = null;
        Room cnt = null;
        for(int i = 0 ; i < roomBuy.size(); i++){
            cnt = roomBuy.get(i);
            rr = roomReadRepository.findByRoom(cnt);
            if(rr.getTotalChat() != rr.getBuyerChat()){
                cnt.setIsRead(1);
                System.out.println("buy");
            }
            room.add(cnt);

        }
        for(int i = 0 ; i < roomSell.size(); i++){
            cnt = roomSell.get(i);
            rr = roomReadRepository.findByRoom(cnt);
            if(rr.getTotalChat() != rr.getSellerChat()){
                cnt.setIsRead(1);
                System.out.println("sell");
            }
            room.add(cnt);
        }


        return room;
    }

    @Override
    public void deleteRoom(String no, User user) {
        Room r = roomRepository.getOne(Integer.parseInt(no));
        int pk = user.getId();

        if(r.getBuyer().getId() == pk && r.getBuyerOut() == 0) {
            r.setBuyerOut(1);
        }
        if(r.getSeller().getId() == pk && r.getSellerOut() == 0) {
            r.setSellerOut(1);
        }


        if(r.getSellerOut() == 1 && r.getBuyerOut() == 1){
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
