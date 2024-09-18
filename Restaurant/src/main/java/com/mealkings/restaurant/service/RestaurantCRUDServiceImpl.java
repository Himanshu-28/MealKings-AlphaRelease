package com.mealkings.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mealkings.restaurant.entity.*;
import com.mealkings.restaurant.exceptions.DataMissingException;
import com.mealkings.restaurant.exceptions.IDMismatchException;
import com.mealkings.restaurant.exceptions.IDNotFoundException;

@Service
public class RestaurantCRUDServiceImpl implements RestaurantCRUDService {
	
	@Autowired
	private RestaurantCRUD resCrudOps;

	@Override
	public void addRestaurant(Restaurant restaurant) throws DataMissingException {
		resCrudOps.addRestaurant(restaurant);
		
	}

	@Override
	public Restaurant getRestaurantDetails(int id) throws IDNotFoundException {
		// TODO Auto-generated method stub
		return resCrudOps.getRestaurantDetails(id);
	}

	@Override
	public void updateRestaurantDetails(int id, Restaurant restaurant)
			throws IDNotFoundException, DataMissingException, IDMismatchException {
		resCrudOps.updateRestaurantDetails(id, restaurant);	
	}

	@Override
	public void deleteRestaurant(int id) throws IDNotFoundException {
		resCrudOps.deleteRestaurant(id);
	}

	@Override
	public void addItem(Item item) throws DataMissingException {
		// TODO Auto-generated method stub
		resCrudOps.addItem(item);
	}

	@Override
	public Item getItem(int id) throws IDNotFoundException {
		// TODO Auto-generated method stub
		return resCrudOps.getItem(id);
	}

	@Override
	public void updateItemDetails(int id, Item item)
			throws IDNotFoundException, DataMissingException, IDMismatchException {
		resCrudOps.updateItemDetails(id, item);
	}

	@Override
	public void deleteItem(int id) throws IDNotFoundException {
		resCrudOps.deleteItem(id);
	}
}
