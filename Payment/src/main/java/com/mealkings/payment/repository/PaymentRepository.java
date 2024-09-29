package com.mealkings.payment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mealkings.payment.entity.Payment;
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{
    List<Payment> findByRestaurantId(Long restaurantId);
    Optional<Payment> findByOrderId(Long orderId);



}
