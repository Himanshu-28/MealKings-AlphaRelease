package com.mealkings.payment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mealkings.payment.entity.Payment;
import com.mealkings.payment.exception.PaymentNotFoundException;
import com.mealkings.payment.repository.PaymentRepository;

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
	    
	    public String getPaymentStatus(Long id) throws PaymentNotFoundException {
	    	Payment payment = paymentRepository.findById(id).orElseThrow(() -> new PaymentNotFoundException("Could not find"));
	    	return payment.getStatus();
	    }

	    @Override
	    public List<Payment> findByRestaurantId(Long restaurantId) {
	        return paymentRepository.findByRestaurantId(restaurantId);
	    }

	    @Override
	    public Optional<Payment> findByOrderId(Long orderId) {
	        return paymentRepository.findByOrderId(orderId); 
	    }
	    
	    @Override
	    public List<Payment> findByCustomerId(Long customerId) {
	        return paymentRepository.findByCustomerId(customerId);
	    }

	

	
	
	
	
}
