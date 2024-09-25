package com.mealkings.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mealkings.user.entity.Customer;
import com.mealkings.user.exceptions.UserAlreadyExistsException;
import com.mealkings.user.exceptions.UserNotFoundException;
import com.mealkings.user.repository.CredentialsRepository;
import com.mealkings.user.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{

	  	@Autowired
	    private UserRepository userRepository;
	  	
	  	@Autowired
	  	private CredentialsRepository crepo;

	    // Create
	    public Customer createUser(Customer user) throws UserAlreadyExistsException {
	        if (userRepository.findById(user.getCustomerId()).isPresent()) {
	            throw new UserAlreadyExistsException(user.getEmail());
	        }
	        return userRepository.save(user);
	    }

	    // Read
	    public List<Customer> getAllUsers() {
	        return userRepository.findAll();
	    }

	    public Customer getUserById(Long id) throws UserNotFoundException {
	        return userRepository.findById(id)
	                             .orElseThrow(() -> new UserNotFoundException("User with id-"+id+" not found!"));
	    }

	    // Update
	    public Customer updateUser(Long id, Customer userDetails) throws UserNotFoundException {
	        if (!userRepository.existsById(id)) {
	            throw new UserNotFoundException("User with id-"+id+" not found!");
	        }
	        Customer olduser = userRepository.findById(id).get();
	        
	        olduser.setAddress(userDetails.getAddress());
	        olduser.setEmail(userDetails.getEmail());
	        olduser.setMobileNo(userDetails.getMobileNo());
	        olduser.setName(userDetails.getName());
	        
	        return userRepository.save(olduser);
	    }

	    // Delete
	    public void deleteUser(Long id) throws UserNotFoundException {
	        if (!userRepository.existsById(id)) {
	            throw new UserNotFoundException("User with id-"+id+" not found!");
	        }
	        crepo.deleteById(id);
	    }

}
