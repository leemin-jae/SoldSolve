package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.UserRegisterPostReq;
import com.ssafy.soldsolve.db.entity.User;

public interface UserService {
	
	User getUserByUserId(String username);

	User createUser(UserRegisterPostReq registerInfo);
}
