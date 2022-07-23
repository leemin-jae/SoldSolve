package com.ssafy.soldsolve.backend.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.soldsolve.backend.api.request.UserRegisterPostReq;
import com.ssafy.soldsolve.backend.db.entity.User;
import com.ssafy.soldsolve.backend.db.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService{
	
	
	
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User getUserByUserId(String username) {
		// TODO Auto-generated method stub
		User user = userRepository.findByUsername(username);
		if(user != null) {
			return user;
		}else {
			return null;
		}
		
	}

	@Override
	public User createUser(UserRegisterPostReq registerInfo) {
		// TODO Auto-generated method stub
		User user = new User();
		user.setUsername(registerInfo.getId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(registerInfo.getPassword()));
		return userRepository.save(user);
	}
	
	
}
