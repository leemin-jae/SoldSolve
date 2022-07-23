package com.ssafy.soldsolve.backend.api.service;

import com.ssafy.soldsolve.backend.api.request.UserRegisterPostReq;
import com.ssafy.soldsolve.backend.db.entity.User;

public interface UserService {
	
	User getUserByUserId(String username);

	User createUser(UserRegisterPostReq registerInfo);
}
