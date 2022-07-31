package com.ssafy.soldsolve.db.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

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
	@Column(name = "user_pk")
	private int id;
	
	private String userid;
	private String password;
	private String username;
	private String nickname;
	private String email;
	
	private String role;
	
	@CreationTimestamp
	private Timestamp createDate;

	@OneToMany(mappedBy = "user")
	private List<Message> messages = new ArrayList<>();

	
	@Builder
	public User(String userid, String password, String username, String nickname, String email, String role,
			Timestamp createDate, List<Message> messages) {
		super();
		this.userid = userid;
		this.password = password;
		this.username = username;
		this.nickname = nickname;
		this.email = email;
		this.role = role;
		this.createDate = createDate;
		this.messages = messages;
	}


	
	
	
}
