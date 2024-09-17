package com.mealkings.OrderHistory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealkings.OrderHistory.entity.OrderHistory;
import com.mealkings.OrderHistory.service.OrderHistoryService;

@RestController
@RequestMapping("/orderhistory")
public class OrderHistoryController {
	
	@Autowired
	private OrderHistoryService service;
	
	@GetMapping("/{user_id}")
	public ResponseEntity<List<OrderHistory>> getOrderHistory(@PathVariable int user_id){
		return ResponseEntity.ok(service.getHistory(user_id));
	}
	
	@PostMapping("/add")
	public void addOrderHistory(@RequestBody OrderHistory orderhistory) {
		service.addHistory(orderhistory);
	}
}
