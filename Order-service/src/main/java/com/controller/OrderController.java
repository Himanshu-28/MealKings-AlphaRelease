package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.entity.Order;
import com.service.OrderService;
import com.service.PlaceOrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService OrderService;
	@Autowired
	private PlaceOrderService placeOrderService;

	@PostMapping("/addorder")
	public ResponseEntity<Order> createOrder(@RequestBody Order Order) {
		Order createdOrder = OrderService.createOrder(Order);
		return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Order>> getAllOrders() {
		List<Order> Orders = OrderService.getAllOrder();
		return new ResponseEntity<>(Orders, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
		Order Order = OrderService.getOrderById(id);
		return new ResponseEntity<>(Order, HttpStatus.OK);
	}


	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
		OrderService.deleteOrder(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody Order order, Long userId) {
        Order savedOrder = placeOrderService.placeOrder(order,userId);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }
	
	@GetMapping("/get/{id}")
	public ResponseEntity<Order> getOrderForUser(@PathVariable Long id) {
		Order Order = placeOrderService.getOrderForUser(id);
		return new ResponseEntity<>(Order, HttpStatus.OK);
	}
	
}
