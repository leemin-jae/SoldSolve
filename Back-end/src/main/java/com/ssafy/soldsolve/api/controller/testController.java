package com.ssafy.soldsolve.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/soldsolve")
public class testController {
	@GetMapping
	public String a() {
		return "fo";
	}
}
