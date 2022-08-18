package com.ssafy.soldsolve.db.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
	@Size(min = 2, max = 10)
	private String username;
	@Size(min = 2, max = 10)
	private String nickname;
	private String email;
	
	private String role;

	private String profileUrl;
	
	@CreationTimestamp
	@JsonFormat(timezone = "Asia/Seoul", pattern = "yyyy-MM-dd HH:mm")
	private Timestamp createDate;

	private double score;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Message> messages = new ArrayList<>();

	@OneToMany(orphanRemoval = true, mappedBy = "roomId", cascade = CascadeType.ALL)
	@JsonIgnore
	List<Room> roomList = new ArrayList<>();


	@OneToMany(orphanRemoval = true, mappedBy = "reviewId", cascade = CascadeType.ALL)
	@JsonIgnore
	List<Review> reviews = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	List<Offer> offers = new ArrayList<>();

	@OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
	@JsonIgnore
	List<Deal> deals = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	List<Wish> wishes = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	List<Product> products = new ArrayList<>();

	@OneToMany(orphanRemoval = true, mappedBy = "buyer" , cascade = CascadeType.ALL)
	@JsonIgnore
	List<Room> room1 = new ArrayList<>();

	@OneToMany(orphanRemoval = true, mappedBy = "seller" , cascade = CascadeType.ALL)
	@JsonIgnore
	List<Room> room2 = new ArrayList<>();

	@OneToMany(orphanRemoval = true, mappedBy = "reviewee", cascade = CascadeType.ALL)
	@JsonIgnore
	List<Review> review1 = new ArrayList<>();

	@OneToMany(orphanRemoval = true, mappedBy = "reviewer", cascade = CascadeType.ALL)
	@JsonIgnore
	List<Review> review2 = new ArrayList<>();
	

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
