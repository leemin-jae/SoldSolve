package com.ssafy.soldsolve.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/soldsolve")
public class testController {
	@GetMapping
	public void a() {

		Room room =  roomRepository.findById(2).orElse(null);


	}

	@Autowired
	ChatRepository MessageRepository;

	@Autowired
	RoomRepository roomRepository;

	@Autowired
	UserRepository userRepository;

	//      /pub/chat/message/
	@PostMapping("/chat/message/")
	public void message(@RequestBody ChatMessage message) {
		Chat chat = new Chat();
		chat.setChatContent(message.getMessage());
		Room r = roomRepository.getOne(message.getRoomId());
		System.out.println(r.getRoomId());
		chat.setRoom(r);
		chat.setWriteUser(userRepository.findByUserid(message.getSender()));
		MessageRepository.save(chat);

		System.out.println("sdfsdfsad" + message.getRoomId());

//        chat.setChatContent(message.getMessage());
//        chat.setChatFrom(message.getSender());
//        chatRepository.save(chat);

	}
}
