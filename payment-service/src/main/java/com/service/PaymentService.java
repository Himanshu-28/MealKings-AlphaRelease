package com.service;

import java.util.List;
import java.util.Optional;

import com.entity.Payment;

public interface PaymentService {
	Payment save(Payment payment);
    Optional<Payment> findById(Long id);
    List<Payment> findByRestaurantId(Long restaurantId);
    Optional<Payment> findByOrderId(Long orderId); 

}



