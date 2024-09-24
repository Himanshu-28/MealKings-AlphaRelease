package com.mealkings.cart.exceptions;

public class QuantityNotAvailableException extends RuntimeException {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = -1607207901751539631L;

	public QuantityNotAvailableException(String message) {
        super(message);
    }
}
