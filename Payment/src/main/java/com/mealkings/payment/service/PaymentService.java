package com.mealkings.payment.service;

import java.util.List;
import java.util.Optional;

import com.mealkings.payment.entity.Payment;
import com.mealkings.payment.exception.PaymentNotFoundException;

public interface PaymentService {
	Payment save(Payment payment);
    Optional<Payment> findById(Long id);
    List<Payment> findByRestaurantId(Long restaurantId);
    Optional<Payment> findByOrderId(Long orderId); 
    String getPaymentStatus(Long id) throws PaymentNotFoundException;
}



