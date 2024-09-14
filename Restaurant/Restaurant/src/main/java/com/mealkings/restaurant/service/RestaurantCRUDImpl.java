package com.mealkings.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mealkings.restaurant.entity.Restaurant;
import com.mealkings.restaurant.exceptions.DataMissingException;
import com.mealkings.restaurant.exceptions.IDMismatchException;
import com.mealkings.restaurant.exceptions.IDNotFoundException;
import com.mealkings.restaurant.repository.RestaurantRepository;

@Component
public class RestaurantCRUDImpl implements RestaurantCRUD {
	
	// Call to the restaurant repository to access CRUD functions
	@Autowired
	private RestaurantRepository rrepo;
	
	// Function to check if the string passed is empty or pointing to null
	private boolean isNullOrEmpty(String str) {
	    return str == null || str.isEmpty();
	}
	
	// Function to check if the restaurant object is valid and has all the fields
	private boolean checkNewRestaurant(Restaurant restaurant) {
	    if (restaurant == null ||
	        restaurant.getId() <= 0 || 
	        isNullOrEmpty(restaurant.getName()) || 
	        isNullOrEmpty(restaurant.getMobile()) ||
	        isNullOrEmpty(restaurant.getAddress())) {
	        return true;
	    }
	    return false;
	}
	
	// Function to add a new restaurant to the database
	@Override
	public void addRestaurant(Restaurant restaurant) throws DataMissingException {
		
		if(checkNewRestaurant(restaurant))
			rrepo.save(restaurant);
		else
			throw new DataMissingException("Incomplete or null data!");
	}

	// Function to get the details of the restaurant basis the ID
	@Override
	public Restaurant getRestaurantDetails(int id) throws IDNotFoundException {
		Restaurant restaurant = rrepo.findById(id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		return restaurant;
	}

	// Function to update the restaurant details
	@Override
	public void updateRestaurantDetails(int id, Restaurant restaurant) throws IDNotFoundException, DataMissingException, IDMismatchException {
		
		// Retrieve the existing restaurant
	    Restaurant oldRestaurantData = rrepo.findById(id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		
		if(checkNewRestaurant(restaurant))
			throw new DataMissingException("Incomplete Data!");
		
		if(id != restaurant.getId())
			throw new IDMismatchException("ID in the url and in the message body not matching!");
		
		oldRestaurantData.setName(restaurant.getName());
		oldRestaurantData.setMobile(restaurant.getMobile());
		oldRestaurantData.setAddress(restaurant.getAddress());
		
		rrepo.save(oldRestaurantData);
	}
	
	// Function to delete the restaurant from the database
	@Override
	public void deleteRestaurant(int id) throws IDNotFoundException {
		Restaurant restaurant = rrepo.findById(id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		
		rrepo.delete(restaurant);
	}

}
