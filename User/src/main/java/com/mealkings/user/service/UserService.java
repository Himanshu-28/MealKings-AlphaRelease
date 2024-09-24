package com.mealkings.user.service;

import java.util.List;

import com.mealkings.user.entity.Customer;

public interface UserService {

	public Customer createUser(Customer user);
	
	public List<Customer> getAllUsers();
	
	public Customer getUserById(Long id);
	
	public Customer updateUser(Long id, Customer userDetails);
	
	public void deleteUser(Long id);
}
