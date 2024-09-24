package com.mealkings.Discount.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mealkings.Discount.entity.Discount;
import com.mealkings.Discount.exceptions.DataMissingException;
import com.mealkings.Discount.repository.DiscountRepository;
import com.mealkings.Discount.exceptions.IDMismatchException;
import com.mealkings.Discount.exceptions.IDNotFoundException;

@Component
public class DiscountOpsImpl implements DiscountOps {
	
	@Autowired
	private DiscountRepository drepo;
	
	// Function to check if the string passed is empty or pointing to null
	private boolean isNullOrEmpty(String str) {
	    return str == null || str.isEmpty();
	}
	
	private boolean checkDiscount (Discount discount) {
	    if (discount == null ||
		    isNullOrEmpty(discount.getDiscountCode()) ||
		    isNullOrEmpty(discount.getDiscountPercentage()) ||
		    discount.getStartDate() == null ||
		    discount.getEndDate() == null) {
	        return false;
	    }
	    return true;
	}

	@Override
	public void addDiscount(Discount discount) throws DataMissingException {
		if(checkDiscount(discount))
			drepo.save(discount);
		else
			throw new DataMissingException("Incomplete or null data!");
	}

	@Override
	public Discount getDiscount(int id) throws IDNotFoundException {
		Discount disc = drepo.findById(id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		return disc;
	}

	@Override
	public List<Discount> getAllDiscount() {
		return (List<Discount>)drepo.findAll();
	}

	@Override
	public void updateDiscount(int id, Discount discount) throws DataMissingException, IDNotFoundException, IDMismatchException {
		// TODO Auto-generated method stub
		Discount oldDisc = drepo.findById(id)
	            .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		
		if(checkDiscount(discount))
			throw new DataMissingException("Incomplete Data!");
		
		if(id != discount.getDiscountId())
			throw new IDMismatchException("ID in the url and in the message body not matching!");
		
		oldDisc.setActive(discount.isActive());
		oldDisc.setDiscountCode(discount.getDiscountCode());
		oldDisc.setDiscountPercentage(discount.getDiscountPercentage());
		oldDisc.setEndDate(discount.getEndDate());
		oldDisc.setStartDate(discount.getStartDate());
		
		drepo.save(oldDisc);
		
	}

	@Override
	public void deleteDiscount(int id) throws IDNotFoundException {
		// TODO Auto-generated method stub
		Discount dsc = drepo.findById(id)
					   .orElseThrow(() -> new IDNotFoundException("ID not present!"));
		drepo.delete(dsc);
	}

}
