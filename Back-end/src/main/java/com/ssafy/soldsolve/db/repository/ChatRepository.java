package com.ssafy.soldsolve.db.repository;


import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    Optional<Chat> findByChatId(int chatId);

    List<Chat> findAllByRoom(Room room);

    Optional<List<Chat>> findAllByRoomAndWriteUser(Room room, User user);
}
