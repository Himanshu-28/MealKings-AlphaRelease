package com.mealkings.Discount.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mealkings.Discount.entity.Discount;
import com.mealkings.Discount.exceptions.DataMissingException;
import com.mealkings.Discount.exceptions.IDMismatchException;
import com.mealkings.Discount.exceptions.IDNotFoundException;

@Service
public class DiscountServiceImpl implements DiscountService {
	
	@Autowired
	private DiscountOps service;

	@Override
	public void addDiscount(Discount discount) throws DataMissingException {
		service.addDiscount(discount);		
	}

	@Override
	public Discount getDiscount(int id) throws IDNotFoundException {
		return service.getDiscount(id);
	}

	@Override
	public List<Discount> getAllDiscount() {
		// TODO Auto-generated method stub
		return service.getAllDiscount();
	}

	@Override
	public void updateDiscount(int id, Discount discount)
			throws DataMissingException, IDNotFoundException, IDMismatchException {
		service.updateDiscount(id, discount);
	}

	@Override
	public void deleteDiscount(int id) throws IDNotFoundException {
		service.deleteDiscount(id);
	}

}
