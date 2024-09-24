package com.mealkings.cart.exceptions;

public class CustomerNotFoundException extends RuntimeException {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -1607207901751539631L;

	public CustomerNotFoundException(String message) {
        super(message);
    }
}
