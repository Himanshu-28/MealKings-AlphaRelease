package com.mealkings.user.service;

import java.util.List;

import com.mealkings.user.entity.Customer;
import com.mealkings.user.exceptions.UserAlreadyExistsException;
import com.mealkings.user.exceptions.UserNotFoundException;

public interface UserService {

	public Customer createUser(Customer user) throws UserAlreadyExistsException;
	
	public List<Customer> getAllUsers();
	
	public Customer getUserById(Long id) throws UserNotFoundException;
	
	public Customer updateUser(Long id, Customer userDetails) throws UserNotFoundException ;
	
	public void deleteUser(Long id) throws UserNotFoundException ;
}
