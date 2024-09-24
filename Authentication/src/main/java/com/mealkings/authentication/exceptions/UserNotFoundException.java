package com.mealkings.authentication.exceptions;

public class UserNotFoundException extends RuntimeException {
	    /**
	 * 
	 */
	private static final long serialVersionUID = -3151743540846316059L;

		public UserNotFoundException(String message) {
	        super("USER NOT FOUND");
	    }
	}
