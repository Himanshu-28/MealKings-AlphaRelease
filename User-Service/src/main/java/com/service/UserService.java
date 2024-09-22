package com.service;

import java.util.List;

import com.entity.User;

public interface UserService {

	public User createUser(User user);
	public List<User> getAllUsers();
	 public User getUserById(Long id);
	 public User updateUser(Long id, User userDetails);
	 public void deleteUser(Long id);
}
