package com.mealkings.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@GetMapping("/{id}")
	public Restaurant getRestaurantDetails(@PathVariable int id)
	{
		try {
			return resService.getRestaurantDetails(id);
		} catch (IDNotFoundException e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@PostMapping()
	public String addRestaurant(@RequestBody Restaurant restaurant)
	{
		try {
			resService.addRestaurant(restaurant);
			return "Added successfully!";
		} catch (Exception e) {
			return e.getMessage();
		}
	}
	
	@PutMapping("/update/{id}")
	public String updateRestaurantDetails(@PathVariable int id,@RequestBody Restaurant restaurant) {
		try {
			resService.updateRestaurantDetails(id, restaurant);
			return "Updated Successfully";
		} catch (Exception e) {
			// TODO: handle exception
			return e.getMessage();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteRestaurant(@PathVariable int id)
	{
		try {
			resService.deleteRestaurant(id);
			return "Deleted successfully!";
		} catch (IDNotFoundException e) {
			return e.getMessage();
		}
	}
}
