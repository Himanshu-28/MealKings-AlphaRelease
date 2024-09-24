package com.mealkings.restaurant.service;

import com.mealkings.restaurant.entity.*;
import com.mealkings.restaurant.exceptions.DataMissingException;
import com.mealkings.restaurant.exceptions.IDMismatchException;
import com.mealkings.restaurant.exceptions.IDNotFoundException;

// A data access object created to list down all the methods that are being used in the code
public interface RestaurantCRUDService {
	
	public void addRestaurant(Restaurant restaurant) throws DataMissingException;
	
	public Restaurant getRestaurantDetails(int id) throws IDNotFoundException;
	
	public void updateRestaurantDetails(int id, Restaurant restaurant) throws IDNotFoundException, DataMissingException, IDMismatchException;
	
	public void deleteRestaurant(int id) throws IDNotFoundException;
	
	public double getRestaurantRating(int id) throws IDNotFoundException;

	public void addItem(Item item) throws DataMissingException;
	
	public Item getItem(int id) throws IDNotFoundException;
	
	public void updateItemDetails(int id, Item item) throws IDNotFoundException, DataMissingException, IDMismatchException;
	
	public void deleteItem(int id) throws IDNotFoundException;
}
