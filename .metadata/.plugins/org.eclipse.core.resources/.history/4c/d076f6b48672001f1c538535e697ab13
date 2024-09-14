package com.mealkings.restaurant.service;

import com.mealkings.restaurant.entity.Restaurant;
import com.mealkings.restaurant.exceptions.DataMissingException;
import com.mealkings.restaurant.exceptions.IDMismatchException;
import com.mealkings.restaurant.exceptions.IDNotFoundException;

public interface RestaurantCRUD {
	
	public void addRestaurant(Restaurant restaurant) throws DataMissingException;
	
	public Restaurant getRestaurantDetails(int id) throws IDNotFoundException;
	
	public void updateRestaurantDetails(int id, Restaurant restaurant) throws IDNotFoundException, DataMissingException, IDMismatchException;
	
	public void deleteRestaurant(int id) throws IDNotFoundException;
}
