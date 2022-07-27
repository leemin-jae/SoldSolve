package com.ssafy.soldsolve.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.soldsolve.db.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUserid(String userid);
	User findByEmail(String email);
	User findByUseridAndEmail(String userid, String email);
	

}
