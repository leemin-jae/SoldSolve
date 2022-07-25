package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.UserRegisterPostReq;
import com.ssafy.soldsolve.db.entity.User;

public interface UserService {
	
	User getUserByUserId(String userId);

	User createUser(UserRegisterPostReq registerInfo);

	void deleteUser(int id);

	void updateUserNickName(User user);

	void updateUserPassword(String userId, String password);

	boolean getPasswordCheck(String userId, String password);
}
