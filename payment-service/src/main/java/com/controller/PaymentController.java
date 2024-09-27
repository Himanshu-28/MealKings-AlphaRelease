package com.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Payment;
import com.service.PaymentService;
@CrossOrigin
@RestController
@RequestMapping("/payments")
public class PaymentController {

	    @Autowired
	    private PaymentService paymentService;

	    @PostMapping
	    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
	        
	        Payment createdPayment = paymentService.save(payment);

	        return ResponseEntity.ok(createdPayment);
	    }

	    @GetMapping("/{payment_id}")
	    public ResponseEntity<Payment> getPaymentBypaymentId(@PathVariable Long payment_id) {
	        return paymentService.findById(payment_id) 
	                .map(ResponseEntity::ok)
	                .orElse(ResponseEntity.notFound().build());
	    }
	    
	    @GetMapping("/order/{order_id}")
	    public ResponseEntity<Payment> getPaymentByOrderId(@PathVariable Long order_id) {
	        return paymentService.findByOrderId(order_id)
	                .map(ResponseEntity::ok)
	                .orElse(ResponseEntity.notFound().build());
	    }

	    
	    @GetMapping("/restaurant/{restaurant_id}")
	    public ResponseEntity<List<Payment>> getPaymentsByRestaurantId(@PathVariable Long restaurant_id) {
	        List<Payment> payments = paymentService.findByRestaurantId(restaurant_id);
	        return payments.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(payments);
	    }
}
