package com.ssafy.soldsolve.api.controller;

import com.ssafy.soldsolve.api.request.ChatMessage;
import com.ssafy.soldsolve.api.request.ProductPostReq;
import com.ssafy.soldsolve.api.service.FileService;
import com.ssafy.soldsolve.api.service.MessageService;
import com.ssafy.soldsolve.api.service.ProductService;
import com.ssafy.soldsolve.common.auth.SsafyUserDetails;
import com.ssafy.soldsolve.db.entity.Chat;
import com.ssafy.soldsolve.db.entity.Product;
import com.ssafy.soldsolve.db.entity.Room;
import com.ssafy.soldsolve.db.entity.RoomRead;
import com.ssafy.soldsolve.db.repository.ChatRepository;
import com.ssafy.soldsolve.db.repository.RoomReadRepository;
import com.ssafy.soldsolve.db.repository.RoomRepository;
import com.ssafy.soldsolve.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/api/test")
public class testController {


	@Autowired
	ChatRepository MessageRepository;

	@Autowired
	RoomRepository roomRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	FileService fileService;

	@Autowired
	ProductService productService;

	@Autowired
	ChatRepository chatRepository;

	@Autowired
	RoomReadRepository roomReadRepository;

	@Autowired
	MessageService messageService;

	//      /pub/chat/message/
	@PostMapping("/chat/message/")
	public void message(@RequestBody ChatMessage message) {

		Room r = roomRepository.getOne(message.getRoomId());

		if(message.getType().equals("JOIN")){
			r.setInUser(r.getInUser() + 1);
			roomRepository.save(r);
			//message.setMessage(message.getSender() + "님이 입장하셨습니다.");
		}else if(message.getType().equals("EXIT")){
			r.setInUser(r.getInUser() - 1);
			roomRepository.save(r);
			//message.setMessage(message.getSender() + "님이 입장하셨습니다.");
		}else if(message.getType().equals("TALK")){
			Chat chat = new Chat();
			chat.setChatContent(message.getMessage());
			chat.setRoom(r);
			chat.setWriteUser(userRepository.findByUserid(message.getSender()));

			int no = chatRepository.save(chat).getChatId();
			RoomRead read = roomReadRepository.findByRoom(r);
			read.setTotalChat(no);

			if(r.getInUser() == 2){
				read.setBuyerChat(no);
				read.setSellerChat(no);
			}else{
				if(r.getBuyer().getUserid().equals(message.getSender())){
					read.setBuyerChat(no);
				}
				if(r.getSeller().getUserid().equals(message.getSender())){
					read.setSellerChat(no);
				}

			}

			roomReadRepository.save(read);

			//messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
		}
		System.out.println("end");
	}



	@PostMapping("/test")
	public ResponseEntity<?> testregistProduct(@RequestPart("files") List<MultipartFile> file, @RequestPart("data") ProductPostReq product, Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		product.setUserId(userId);
		try {
			int number = productService.registProduct(product);
			fileService.ListImageDir(file,number, "productImg");

			return new ResponseEntity<Product>(productService.getProduct(Integer.toString(number)), HttpStatus.OK);


		} catch (Exception e) {
			return new ResponseEntity<String>("등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("")
	public ResponseEntity<?> testTimeProduct(@RequestBody ChatMessage message) {

		Product p = productService.getProduct("1");

		System.out.println("1 : " + p.getLiveTime());
		System.out.println("2 : " + p.getLiveTime().toString());
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

		String time = simpleDateFormat.format(p.getLiveTime());

		System.out.println("3 : " + time );

		System.out.println(		messageService.liveTimeLog(p));



		return new ResponseEntity<Product>(p, HttpStatus.OK);

	}



	@PostMapping("/product")
	public ResponseEntity<?> registProduct( @RequestPart("data") ProductPostReq product, Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		product.setUserId(userId);

		try {
			int number = productService.registProduct(product);
			return new ResponseEntity<Product>(productService.getProduct(Integer.toString(number)), HttpStatus.OK);


		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


}
