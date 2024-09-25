package com.mealkings.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mealkings.user.entity.Customer;
import com.mealkings.user.exceptions.UserAlreadyExistsException;
import com.mealkings.user.exceptions.UserNotFoundException;
import com.mealkings.user.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<Customer> createUser(@RequestBody Customer user) {
        Customer createdUser;
		try {
			createdUser = userService.createUser(user);
		} catch (UserAlreadyExistsException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getAllUsers() {
        List<Customer> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getUserById(@PathVariable Long id) {
    	Customer user;
		try {
			user = userService.getUserById(id);
		} catch (UserNotFoundException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Customer> updateUser(@PathVariable Long id, @RequestBody Customer user) {
    	Customer updatedUser;
		try {
			updatedUser = userService.updateUser(id, user);
		} catch (UserNotFoundException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
			userService.deleteUser(id);
		} catch (UserNotFoundException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
