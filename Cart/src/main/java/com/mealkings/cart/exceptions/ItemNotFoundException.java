package com.mealkings.cart.exceptions;

public class ItemNotFoundException extends RuntimeException {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -1607207901751539631L;

	public ItemNotFoundException(String message) {
        super(message);
    }
}
