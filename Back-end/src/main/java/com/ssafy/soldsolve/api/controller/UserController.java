package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.service.MailSendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.soldsolve.api.request.UserRegisterPostReq;
import com.ssafy.soldsolve.api.response.UserRes;
import com.ssafy.soldsolve.api.service.UserService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.common.model.response.BaseResponseBody;
import com.ssafy.soldsolve.db.entity.User;


/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
//@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	
	private final String SUCCESS = "success";
	private final String FAIL = "fail";
	
	@Autowired
	UserService userService;

	@Autowired
	MailSendService mailSendService;


	@PostMapping()
//	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
//    @ApiResponses({
//        @ApiResponse(code = 200, message = "성공"),
//        @ApiResponse(code = 401, message = "인증 실패"),
//        @ApiResponse(code = 404, message = "사용자 없음"),
//        @ApiResponse(code = 500, message = "서버 오류")
//    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody  UserRegisterPostReq registerInfo) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}
	
	@GetMapping("/me")
//	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
//    @ApiResponses({
//        @ApiResponse(code = 200, message = "성공"),
//        @ApiResponse(code = 401, message = "인증 실패"),
//        @ApiResponse(code = 404, message = "사용자 없음"),
//        @ApiResponse(code = 500, message = "서버 오류")
//    })
	public ResponseEntity<UserRes> getUserInfo( Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		
		return ResponseEntity.status(200).body(UserRes.of(user));
	}
	
	@GetMapping("/idcheck")
	public ResponseEntity<?> getIdCheck(@RequestBody UserRegisterPostReq registerInfo){
		User user = userService.getUserByUserId(registerInfo.getUserId());
		
		if(user == null) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
		
	}

	@GetMapping("/passwordCheck")
	public ResponseEntity<?> getPasswordCheck(@RequestBody UserRegisterPostReq registerInfo, Authentication authentication){

		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();

		if(userService.getPasswordCheck(userId, registerInfo.getPassword())) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping("/emailcheck")
	public ResponseEntity<?> getEmailCheck(@RequestBody UserRegisterPostReq registerInfo){

		if(userService.getEmailCheck(registerInfo.getEmail())) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}

	}



	@PatchMapping("/update/password")
//    @ApiOperation(value = "회원 정보 수정", notes = "사용자의 <strong>닉네임</strong>을 수정한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
	public ResponseEntity<? extends BaseResponseBody> updateUserPassword(
			@RequestBody UserRegisterPostReq info,
			Authentication authentication) {

		String password = info.getPassword();
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();

		userService.updateUserPassword(userId, password);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}




	@PatchMapping("/update/userinfo")
//    @ApiOperation(value = "회원 정보 수정", notes = "사용자의 <strong>닉네임</strong>을 수정한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })

	//{password , nickName}
	public ResponseEntity<? extends BaseResponseBody> updateUserNickName(
			@RequestBody UserRegisterPostReq info,
			Authentication authentication) {

		String nickName = info.getNickName();
		String password = info.getPassword();
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		userService.updateUserUserInfo(userId , password , nickName);


		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}

	@DeleteMapping()
//    @ApiOperation(value = "회원 탈퇴", notes = "로그인한 회원의 정보를 삭제한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
	public ResponseEntity<? extends BaseResponseBody> deleteUser(Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		int Id = userDetails.getUser().getId();
		userService.deleteUser(Id);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, SUCCESS));
	}



	@GetMapping("/AuthMail")
	//@ResponseBody
	public ResponseEntity<String> mailAuth(@RequestBody UserRegisterPostReq userInfo) throws Exception {

		String authKey = mailSendService.sendAuthMail(userInfo.getEmail()); //사용자가 입력한 메일주소로 메일을 보냄
		return new ResponseEntity<String>(authKey, HttpStatus.OK);
	}



	@PatchMapping("/temporaryPw")
	//@ResponseBody
	public ResponseEntity<String> temporaryPw(@RequestBody UserRegisterPostReq userInfo) throws Exception {

		String userId = userInfo.getId();
		String userEmail = userInfo.getEmail();

		User user = userService.getUserByUserIdAndEmail(userId,userEmail);

		if(user != null) {
			String temporaryPwd = mailSendService.sendPwMail(userEmail);
			userService.updateUserPassword(userId, temporaryPwd);
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}else{
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}



	}


}
