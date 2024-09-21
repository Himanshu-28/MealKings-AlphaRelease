package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Order;
import com.exceptions.OrderAlreadyExistsException;
import com.exceptions.OrderNotFoundException;
import com.repo.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{

	  @Autowired
	    private OrderRepository orderRepository;

	    // Create
	    public Order createOrder(Order order) {
	        if (orderRepository.findById(order.getOrderId()).isPresent()) {
	            throw new OrderAlreadyExistsException(order.getOrderId());
	        }
	        return orderRepository.save(order);
	    }

	    // Read
	    public List<Order> getAllOrder() {
	        return orderRepository.findAll();
	    }

	    public Order getOrderById(Long id) {
	        return orderRepository.findById(id)
	                             .orElseThrow(() -> new OrderNotFoundException(id));
	    }

	    // Update
	    public Order updateorder(Long id, Order orderDetails) {
	        if (!orderRepository.existsById(id)) {
	            throw new OrderNotFoundException(id);
	        }
	        orderDetails.setOrderId(id);
	        return orderRepository.save(orderDetails);
	    }

	    // Delete
	    public void deleteOrder(Long id) {
	        if (!orderRepository.existsById(id)) {
	            throw new OrderNotFoundException(id);
	        }
	        orderRepository.deleteById(id);
	    }

		
		




}
