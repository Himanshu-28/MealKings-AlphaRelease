package com.mealkings.InventoryManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mealkings.InventoryManagement.entity.Item;
import com.mealkings.InventoryManagement.exceptions.DataMissingException;
import com.mealkings.InventoryManagement.exceptions.IDMismatchException;
import com.mealkings.InventoryManagement.exceptions.IDNotFoundException;

@Service
public class InventoryCRUDServiceImpl implements InventoryCRUDService {
	
	@Autowired
	private InventoryCRUD invCrudOps;

	@Override
	public void addItem(Item item) throws DataMissingException {
		// TODO Auto-generated method stub
		invCrudOps.addItem(item);
		
	}

	@Override
	public Item getItem(int id) throws IDNotFoundException {
		// TODO Auto-generated method stub
		return invCrudOps.getItem(id);
	}

	@Override
	public void updateItemDetails(int id, Item item)
			throws IDNotFoundException, DataMissingException, IDMismatchException {
		invCrudOps.updateItemDetails(id, item);
	}

	@Override
	public void deleteItem(int id) throws IDNotFoundException {
		invCrudOps.deleteItem(id);
	}

}
