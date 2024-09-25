package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealkings.authentication.model.User;
import com.mealkings.authentication.service.UserService;

@CrossOrigin(origins="*")
@RestController("/users")
public class AppController {
    @Autowired
    private UserService userService;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
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
       // return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        return ResponseEntity.ok("Registration successful");

    }
}
