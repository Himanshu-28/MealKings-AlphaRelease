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
	
	@Autowired
	private RestaurantRepository rrepo;
	
	private boolean checkNewRestaurant(Restaurant restaurant) {
		if ((restaurant == null) || (restaurant.getId() == 0) || 
			(restaurant.getName() == null || restaurant.getName() == "") || 
			(restaurant.getMobile() == null || restaurant.getMobile() == "") ||
			(restaurant.getAddress() == null || restaurant.getAddress() == ""))
			return true;
		return false;
	}
	
	@Override
	public void addRestaurant(Restaurant restaurant) throws DataMissingException {
		
		if(checkNewRestaurant(restaurant))
			rrepo.save(restaurant);
		else
			throw new DataMissingException("Incomplete or null data!");
	}

	@Override
	public Restaurant getRestaurantDetails(int id) throws IDNotFoundException {
		if(rrepo.findById(id).isPresent())
			return rrepo.findById(id).get();
		else
			throw new IDNotFoundException("ID not present!");
	}

	@Override
	public void updateRestaurantDetails(int id, Restaurant restaurant) throws IDNotFoundException, DataMissingException, IDMismatchException {
		if(rrepo.findById(id).isEmpty())
			throw new IDNotFoundException("ID not present!");
		
		if(checkNewRestaurant(restaurant))
			throw new DataMissingException("Incomplete Data!");
		
		if(id != restaurant.getId())
			throw new IDMismatchException("ID in the url and in the message body not matching!");
		
		Restaurant oldRestaurantData = rrepo.findById(id).get();
		
		oldRestaurantData.setName(restaurant.getName());
		oldRestaurantData.setMobile(restaurant.getMobile());
		oldRestaurantData.setAddress(restaurant.getAddress());
		
		rrepo.save(oldRestaurantData);
	}

	@Override
	public void deleteRestaurant(int id) throws IDNotFoundException {
		if(rrepo.findById(id).isEmpty())
			throw new IDNotFoundException("ID not present!");
		
		rrepo.delete(rrepo.findById(id).get());
	}

}
