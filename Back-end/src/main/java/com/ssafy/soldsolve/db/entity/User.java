package com.ssafy.soldsolve.db.entity;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {
	
	@Id   
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
	private int id;
	
	private String userid;
	private String password;
	private String username;
	private String nickname;
	private String email;
	
	private String role;
	
	@CreationTimestamp
	private Timestamp createDate;

	
	@Builder
	public User(String userId, String password, String username, String nickname, String email, String role,
			Timestamp createDate) {
		super();
		this.userid = userId;
		this.password = password;
		this.username = username;
		this.nickname = nickname;
		this.email = email;
		this.role = role;
		this.createDate = createDate;
	}


	
	
	
}
