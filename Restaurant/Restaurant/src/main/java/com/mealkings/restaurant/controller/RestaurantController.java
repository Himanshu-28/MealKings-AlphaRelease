package com.mealkings.restaurant.controller;

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

import com.mealkings.restaurant.entity.Restaurant;
import com.mealkings.restaurant.exceptions.IDNotFoundException;
import com.mealkings.restaurant.service.RestaurantCRUDService;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {
	
	@Autowired
	private RestaurantCRUDService resService;
	
	// API call to fetch data from the database basis the ID
	@GetMapping("/{id}")
	public ResponseEntity<Restaurant> getRestaurantDetails(@PathVariable int id)
	{
		try {
			return ResponseEntity.ok(resService.getRestaurantDetails(id));
		} catch (IDNotFoundException e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	// API call to on-board new restaurant to the database
	@PostMapping("/add")
	public ResponseEntity<String> addRestaurant(@RequestBody Restaurant restaurant) {
	    try {
	        resService.addRestaurant(restaurant);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Added successfully!");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    }
	}

	// API call to update data based on ID
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateRestaurantDetails(@PathVariable int id,@RequestBody Restaurant restaurant) {
		try {
			resService.updateRestaurantDetails(id, restaurant);
	        return ResponseEntity.status(HttpStatus.OK).body("Updated Successfully!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	// API Call to delete a restaurant based on the ID
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteRestaurant(@PathVariable int id)
	{
		try {
			resService.deleteRestaurant(id);
	        return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully!");
		} catch (IDNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
