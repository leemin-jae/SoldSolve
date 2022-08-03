package com.ssafy.soldsolve.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.soldsolve.db.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUserid(String userid);
	User findByEmail(String email);
	User findByUseridAndEmailAndUsername(String userid, String email,String username);
    User findByUsernameAndEmail(String username, String email);


}

