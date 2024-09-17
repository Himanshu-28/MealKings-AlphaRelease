package com.mealkings.InventoryManagement.service;

import com.mealkings.InventoryManagement.entity.Item;
import com.mealkings.InventoryManagement.exceptions.DataMissingException;
import com.mealkings.InventoryManagement.exceptions.IDMismatchException;
import com.mealkings.InventoryManagement.exceptions.IDNotFoundException;

// A data access object created to list down all the methods that are being used in the code
public interface InventoryCRUDService {
	
	public void addItem(Item item) throws DataMissingException;
	
	public Item getItem(int id) throws IDNotFoundException;
	
	public void updateItemDetails(int id, Item item) throws IDNotFoundException, DataMissingException, IDMismatchException;
	
	public void deleteItem(int id) throws IDNotFoundException;
	
	
}
