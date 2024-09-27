package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Payment;
import com.paymentRepo.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {	
	    @Autowired
	    private PaymentRepository paymentRepository;

	    @Override
	    public Payment save(Payment payment) {
	        return paymentRepository.save(payment);
	    }

	    @Override
	    public Optional<Payment> findById(Long id) {
	        return paymentRepository.findById(id);
	    }

	    @Override
	    public List<Payment> findByRestaurantId(Long restaurantId) {
	        return paymentRepository.findByRestaurantId(restaurantId);
	    }

	    @Override
	    public Optional<Payment> findByOrderId(Long orderId) {
	        return paymentRepository.findByOrderId(orderId); 
	    }

	

	
	
	
	
}
