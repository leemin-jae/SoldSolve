package com.ssafy.soldsolve.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.soldsolve.api.request.UserRegisterPostReq;
import com.ssafy.soldsolve.db.entity.User;
import com.ssafy.soldsolve.db.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService{
	
	
	
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User getUserByUserId(String userId) {
		// TODO Auto-generated method stub
		User user = userRepository.findByUserid(userId);
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
		user.setUserid(registerInfo.getId());
		user.setUsername(registerInfo.getUserName());
		user.setEmail(registerInfo.getEmail());
		user.setNickname(registerInfo.getNickName());
		user.setRole("ROLE_USER");
		
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(registerInfo.getPassword()));
		
		return userRepository.save(user);
	}


	@Override
	public void deleteUser(int id) {
		userRepository.deleteById(id);
	}

	@Override
	public void updateUserNickName(User user) {
		userRepository.save(user);
	}

	@Override
	public void updateUserPassword(String userId, String password) {
		User user = getUserByUserId(userId);
		user.setPassword(passwordEncoder.encode(password));

		userRepository.save(user);
	}

	@Override
	public boolean getPasswordCheck(String userId, String password) {
		User user = getUserByUserId(userId);
		if(passwordEncoder.matches(password, user.getPassword())){
			return true;
		}else{
			return false;
		}
	}


}
