package com.mealkings.restaurant.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mealkings.restaurant.entity.Item;
import com.mealkings.restaurant.entity.Restaurant;
import com.mealkings.restaurant.exceptions.DataMissingException;
import com.mealkings.restaurant.exceptions.IDMismatchException;
import com.mealkings.restaurant.exceptions.IDNotFoundException;
import com.mealkings.restaurant.repository.CredentialsRepository;
import com.mealkings.restaurant.repository.ItemRepository;
import com.mealkings.restaurant.repository.RestaurantRepository;

@Component
public class RestaurantCRUDImpl implements RestaurantCRUD {
	
	// Call to the restaurant repository to access CRUD functions
	@Autowired
	private RestaurantRepository rrepo;

	// Call to the item repository to access CRUD functions
	@Autowired
	private ItemRepository irepo;
	
	// Call to the Credential repository to access CRUD functions
	@Autowired
	private CredentialsRepository crepo;
	
	// Function to check if the string passed is empty or pointing to null
	private boolean isNullOrEmpty(String str) {
	    return str == null || str.isEmpty();
	}
	
	// Function to check if the restaurant object is valid and has all the fields
	private boolean checkNewRestaurant(Restaurant restaurant) {
	    if (restaurant == null ||
	        restaurant.getRestaurantId() <= 0 || 
	        restaurant.getRatings() < 0 || 
	        isNullOrEmpty(restaurant.getName()) || 
	        isNullOrEmpty(restaurant.getMobileNo()) ||
	        isNullOrEmpty(restaurant.getAddress())) {
	        return false;
	    }
	    return true;
	}
	
	// Function to check if the item object is valid and has all the fields
	private boolean checkNewItem (Item item) {
	    if (item == null ||
		    item.getItemId() < 0 || 
	        item.getItemCost() <= 0 || 
	        item.getQuantity() < 0 ||  
	        isNullOrEmpty(item.getItemName()) || 
	        isNullOrEmpty(""+item.getCategory())) {
	        return false;
	    }
	    return true;
	}
	
	// Function to add a new restaurant to the database
	@Override
	public void addRestaurant(Restaurant restaurant) throws DataMissingException {
		
		if(!checkNewRestaurant(restaurant))
			rrepo.save(restaurant);
		else
			throw new DataMissingException("Incomplete or null data!");
	}

	// Function to get the details of the restaurant basis the ID
	@Override
	public Restaurant getRestaurantDetails(long restaurant_id) throws IDNotFoundException {
		Restaurant restaurant = rrepo.findById(restaurant_id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		return restaurant;
	}

	// Function to update the restaurant details
	@Override
	public void updateRestaurantDetails(long restaurant_id, Restaurant updated_restaurant) throws IDNotFoundException, DataMissingException, IDMismatchException {
		
		// Retrieve the existing restaurant
	    Restaurant oldRestaurantData = rrepo.findById(restaurant_id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		
		if(!checkNewRestaurant(updated_restaurant))
			throw new DataMissingException("Incomplete Data!");
		
		if(restaurant_id != updated_restaurant.getRestaurantId())
			throw new IDMismatchException("ID in the url("+restaurant_id+")and in the message body("+updated_restaurant.getRestaurantId()+") not matching!");
		
		updated_restaurant.setRestaurantId(oldRestaurantData.getRestaurantId());
		
		rrepo.save(updated_restaurant);
	}
	
	// Function to delete the restaurant from the database
	@Override
	public void deleteRestaurant(long restaurant_id) throws IDNotFoundException {
		
		crepo.delete(crepo.findById(restaurant_id).orElseThrow(() -> new IDNotFoundException("ID not present!")));
	}
	
	@Override
	public double getRestaurantRating(long restaurant_id) throws IDNotFoundException {
		Restaurant res = rrepo.findById(restaurant_id)
	            .orElseThrow(() -> new IDNotFoundException("Restaurant ID not present!"));
		
		return res.getRatings();
	}

	@Override
	public void addItem(long restaurant_id,Item item) throws DataMissingException, IDNotFoundException {
		if(checkNewItem(item))
		{
			Restaurant restaurant = rrepo.findById(restaurant_id).orElseThrow(() -> new IDNotFoundException("Restaurant not found!"));
			item.setRestaurant(restaurant);
			irepo.save(item);
		}
		else
			throw new DataMissingException("Incomplete or null data!");
	}

	@Override
	public List<Item> getAllItem(long restaurant_id) throws IDNotFoundException {
		List<Item> allItems = irepo.findAll();
		List<Item> reqdItems = new ArrayList<Item>();

		for(Item item: allItems)
			if(item.getRestaurant().getRestaurantId() == restaurant_id)
				reqdItems.add(item);
		
		return reqdItems;
	}
	
	@Override
	public Item getItem(int item_id) throws IDNotFoundException {
		Item item = irepo.findById(item_id)
				.orElseThrow(() -> new IDNotFoundException("ID not present!"));
		return item;
	}

	@Override
	public void updateItemDetails(int item_id, Item new_item)
			throws IDNotFoundException, DataMissingException, IDMismatchException {

		// Retrieve the existing restaurant
	    Item oldItem = irepo.findById(item_id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		
		if(!checkNewItem(new_item))
			throw new DataMissingException("Incomplete Data!");
		
		if(item_id != oldItem.getItemId())
			throw new IDMismatchException("ID in the url and in the message body not matching!");
		
		oldItem.setCategory(new_item.getCategory());
		oldItem.setDescription(new_item.getDescription());
		oldItem.setItemCost(new_item.getItemCost());
		oldItem.setItemName(new_item.getItemName());
		oldItem.setQuantity(new_item.getQuantity());

		irepo.save(oldItem);
		
	}

	@Override
	public void deleteItem(int item_id) throws IDNotFoundException {
		Item item = irepo.findById(item_id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		
		irepo.delete(item);
	}

	@Override
	public List<Restaurant> getAllRestaurants() {
		// TODO Auto-generated method stub
		return (List<Restaurant>) rrepo.findAll();
	}
}
