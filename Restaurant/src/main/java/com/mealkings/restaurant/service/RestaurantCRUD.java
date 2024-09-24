package com.mealkings.restaurant.service;

import java.util.List;

import com.mealkings.restaurant.entity.*;
import com.mealkings.restaurant.exceptions.DataMissingException;
import com.mealkings.restaurant.exceptions.IDMismatchException;
import com.mealkings.restaurant.exceptions.IDNotFoundException;

// A data access object created to list down all the methods that are being used in the code
public interface RestaurantCRUD {
	
	public void addRestaurant(Restaurant restaurant) throws DataMissingException;
	
	public Restaurant getRestaurantDetails(long restaurant_id) throws IDNotFoundException;
	
	public void updateRestaurantDetails(long restaurant_id, Restaurant updated_restaurant) throws IDNotFoundException, DataMissingException, IDMismatchException;
	
	public void deleteRestaurant(long restaurant_id) throws IDNotFoundException;
	
	public List<Item> getAllItem(long restaurant_id) throws IDNotFoundException;
	
	public double getRestaurantRating(long restaurant_id) throws IDNotFoundException;
	
	public void addItem(long restaurant_id, Item item) throws DataMissingException, IDNotFoundException;
	
	public Item getItem(int item_id) throws IDNotFoundException;
	
	public void updateItemDetails(int item_id, Item item) throws IDNotFoundException, DataMissingException, IDMismatchException;
	
	public void deleteItem(int item_id) throws IDNotFoundException;
}
