package com.mealkings.Discount.service;

import java.util.List;

import com.mealkings.Discount.entity.Discount;
import com.mealkings.Discount.exceptions.DataMissingException;
import com.mealkings.Discount.exceptions.IDMismatchException;
import com.mealkings.Discount.exceptions.IDNotFoundException;

public interface DiscountOps {
	
	public void addDiscount(Discount discount) throws DataMissingException;
	
	public Discount getDiscount(int id) throws IDNotFoundException;
	
	public List<Discount> getAllDiscount();
	
	public void updateDiscount(int id, Discount discount) throws DataMissingException, IDNotFoundException, IDMismatchException;
	
	public void deleteDiscount(int id) throws IDNotFoundException;
	
}
