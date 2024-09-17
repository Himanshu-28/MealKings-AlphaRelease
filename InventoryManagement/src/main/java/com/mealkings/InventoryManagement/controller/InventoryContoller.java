package com.mealkings.InventoryManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealkings.InventoryManagement.entity.Item;
import com.mealkings.InventoryManagement.exceptions.IDNotFoundException;
import com.mealkings.InventoryManagement.service.InventoryCRUDService;

@RestController
@RequestMapping("/inventory")
public class InventoryContoller {
	
	@Autowired
	private InventoryCRUDService itemService;
	
	// API call to fetch data from the database basis the ID
	@GetMapping("/{id}")
	public ResponseEntity<Item> getItemDetails(@PathVariable int id)
	{
		try {
			return ResponseEntity.ok(itemService.getItem(id));
		} catch (IDNotFoundException e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	// API call to add new item to the inventory
	@PostMapping("/add")
	public ResponseEntity<String> addItem(@RequestBody Item item) {
	    try {
	        itemService.addItem(item);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Added successfully!");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    }
	}

	// API call to update data based on ID
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateRestaurantDetails(@PathVariable int id,@RequestBody Item item) {
		try {
			itemService.updateItemDetails(id, item);
	        return ResponseEntity.status(HttpStatus.OK).body("Updated Successfully!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	// API Call to delete an item based on the ID
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteRestaurant(@PathVariable int id)
	{
		try {
			itemService.deleteItem(id);
	        return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully!");
		} catch (IDNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
