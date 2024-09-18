package com.mealkings.Order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealkings.Order.entity.Order;
import com.mealkings.Order.exceptions.IDNotFoundException;
import com.mealkings.Order.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
	
	@Autowired
	private OrderService service;
	
	@GetMapping("/restaurant/active/{id}")
	public ResponseEntity<List<Order>> getActiveOrderByRestaurant(@PathVariable int id){
		return ResponseEntity.ok(service.getActiveOrderByRestaurant(id));
	}
	
	@GetMapping("/user/active/{id}")
	public ResponseEntity<List<Order>> getActiveOrderByUser(@PathVariable int id){
		return ResponseEntity.ok(service.getActiveOrderByRestaurant(id));
	}
	
	@GetMapping("/restaurant/past/{id}")
	public ResponseEntity<List<Order>> getPastOrderByRestaurant(@PathVariable int id){
		return ResponseEntity.ok(service.getPastOrderByRestaurant(id));
	}
	
	@GetMapping("/user/past/{id}")
	public ResponseEntity<List<Order>> getPastOrderByUser(@PathVariable int id){
		return ResponseEntity.ok(service.getPastOrderByUser(id));
	}
	
	@PutMapping("/add")
	public ResponseEntity<String> addOrderHistory(@RequestBody int order_id, @RequestBody String status) {
		try {
			service.updateOrderStatus(order_id, status);
			return ResponseEntity.status(HttpStatus.OK).body("Updated status!");
		} catch (IDNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
