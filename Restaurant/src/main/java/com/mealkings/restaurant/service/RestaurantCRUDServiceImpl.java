package com.mealkings.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mealkings.restaurant.entity.Restaurant;
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

}
