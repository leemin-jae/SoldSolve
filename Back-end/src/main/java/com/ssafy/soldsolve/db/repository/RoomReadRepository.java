package com.ssafy.soldsolve.db.repository;


import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.RoomRead;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;




@Repository
public interface RoomReadRepository extends JpaRepository<RoomRead, Integer> {
    RoomRead findByRoom(Room r);
}
