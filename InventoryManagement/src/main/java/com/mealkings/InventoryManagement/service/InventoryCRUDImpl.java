package com.mealkings.InventoryManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mealkings.InventoryManagement.entity.Item;
import com.mealkings.InventoryManagement.exceptions.DataMissingException;
import com.mealkings.InventoryManagement.exceptions.IDMismatchException;
import com.mealkings.InventoryManagement.exceptions.IDNotFoundException;
import com.mealkings.InventoryManagement.repository.ItemRepository;

@Component
public class InventoryCRUDImpl implements InventoryCRUD {
	
	// Call to the item repository to access CRUD functions
	@Autowired
	private ItemRepository irepo;
	
	// Function to check if the string passed is empty or pointing to null
	private boolean isNullOrEmpty(String str) {
	    return str == null || str.isEmpty();
	}
	
	// Function to check if the item object is valid and has all the fields
	private boolean checkNewItem (Item item) {
	    if (item == null ||
		    item.getItem_id() <= 0 || 
	        item.getItem_cost() <= 0 || 
	        item.getQuantity() < 0 || 
	        item.getRestaurant_id() <= 0 || 
	        isNullOrEmpty(item.getItem_name()) || 
	        isNullOrEmpty(""+item.getFood_class())) {
	        return false;
	    }
	    return true;
	}
	
	// Function to add a new restaurant to the database
	@Override
	public void addItem(Item item) throws DataMissingException {
		
		if(checkNewItem(item))
			irepo.save(item);
		else
			throw new DataMissingException("Incomplete or null data!");
	}

	// Function to get the details of the item basis the ID
	@Override
	public Item getItem(int id) throws IDNotFoundException {
		Item item = irepo.findById(id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		return item;
	}

	// Function to update the restaurant details
	@Override
	public void updateItemDetails(int id, Item item) throws IDNotFoundException, DataMissingException, IDMismatchException {
		
		// Retrieve the existing restaurant
	    Item oldItem = irepo.findById(id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));

		
		if(!checkNewItem(item))
			throw new DataMissingException("Incomplete Data!");
		
		if(id != oldItem.getItem_id())
			throw new IDMismatchException("ID in the url and in the message body not matching!");
		
		oldItem.setRestaurant_id(item.getRestaurant_id());
		oldItem.setItem_name(item.getItem_name());
		oldItem.setItem_cost(item.getItem_cost());
		oldItem.setQuantity(item.getQuantity());
		oldItem.setFood_class(item.getFood_class());
		
		irepo.save(oldItem);
	}
	
	// Function to delete the restaurant from the database
	@Override
	public void deleteItem(int id) throws IDNotFoundException {
		Item item = irepo.findById(id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		
		irepo.delete(item);
	}

}
