package com.ssafy.soldsolve.db.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jdk.nashorn.internal.ir.annotations.Ignore;
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

	@JsonIgnore
	private String password;
	private String username;
	private String nickname;
	private String email;
	
	private String role;

	private String profileUrl;
	
	@CreationTimestamp
	@JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
	private Timestamp createDate;

	private double score;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Message> messages = new ArrayList<>();

	@OneToMany(orphanRemoval = true, mappedBy = "roomId")
	@JsonIgnore
	List<Room> roomList = new ArrayList<>();

	@OneToMany(orphanRemoval = true, mappedBy = "reviewId")
	@JsonIgnore
	List<Review> reviews = new ArrayList<>();


	@Builder
	public User(String userid, String password, String username, String nickname, String email, String role, String profileUrl, Timestamp createDate, List<Message> messages) {
		this.userid = userid;
		this.password = password;
		this.username = username;
		this.nickname = nickname;
		this.email = email;
		this.role = role;
		this.profileUrl = profileUrl;
		this.createDate = createDate;
		this.messages = messages;
	}
}
