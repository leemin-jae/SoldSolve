package com.ssafy.soldsolve.api.service;

import com.ssafy.soldsolve.api.request.UserRegisterPostReq;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.domain.Page;

public interface UserService {

	User getUserByUserId(String userId);

	User createUser(UserRegisterPostReq registerInfo);

	User getUserByUserIdAndEmailAndUserName(String userId, String userEmail, String userName);

	User getUserByUserNameAndUserEmail(String userName, String userEmail);

	void deleteUser(int id);


	void updateUserPassword(String userId, String password);

	boolean getPasswordCheck(String userId, String password);

	boolean getEmailCheck(String email);

	void updateUserUserInfo(String userId, String nickName, String password);


	void updateUserProfile(String userId, String profileUrl) ;
}
