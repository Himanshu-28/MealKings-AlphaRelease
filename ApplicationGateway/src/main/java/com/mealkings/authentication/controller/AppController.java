package com.mealkings.authentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealkings.authentication.model.User;
import com.mealkings.authentication.service.UserService;

@CrossOrigin(origins="*")
@Controller
@RequestMapping("/users")
public class AppController {
    @Autowired
    private UserService userService;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@GetMapping("/login")
    public String login() {
        return "login";
    }
	
	@GetMapping("/register")
	public String register() {
		return "register";
	}

    @GetMapping("/success")
    public String success() {
        return "success";
    }
    
    @GetMapping("/ad")
    public String ad() {
        return "ad";
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@ModelAttribute User user) {
        userService.registerUser(user);
        return ResponseEntity.ok("Registration successful");

    }
}
