package com.mealkings.Discount.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mealkings.Discount.entity.Discount;
import com.mealkings.Discount.exceptions.IDNotFoundException;
import com.mealkings.Discount.service.DiscountService;

@RestController
@RequestMapping("/discount")
public class DiscountController {
	
	@Autowired
	private DiscountService dscSer;
	
	// API call to fetch discount from the database basis the ID
	@GetMapping("/{id}")
	public ResponseEntity<Discount> getDiscount(@PathVariable int id)
	{
		try {
			return ResponseEntity.ok(dscSer.getDiscount(id));
		} catch (IDNotFoundException e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	// API call to add new discount to the database
	@PostMapping("/add")
	public ResponseEntity<String> addDiscount(@RequestBody Discount discount) {
	    try {
	        dscSer.addDiscount(discount);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Added discount successfully!");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    }
	}

	// API call to update discount based on ID
	@PutMapping("/update/{id}")
	public ResponseEntity<String> updateDiscount(@PathVariable int id,@RequestBody Discount discount) {
		try {
			dscSer.updateDiscount(id, discount);
	        return ResponseEntity.status(HttpStatus.OK).body("Updated discount Successfully!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
	
	// API call to fetch all the discounts
	@GetMapping("/all")
	public ResponseEntity<List<Discount>> getAllDiscounts()
	{
		return ResponseEntity.status(HttpStatus.OK).body(dscSer.getAllDiscount());
	}
	
	// API Call to delete a discount based on the ID
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteDiscount(@PathVariable int id)
	{
		try {
			dscSer.deleteDiscount(id);
	        return ResponseEntity.status(HttpStatus.OK).body("Deleted discount successfully!");
		} catch (IDNotFoundException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
}
