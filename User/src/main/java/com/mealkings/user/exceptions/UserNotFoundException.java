package com.mealkings.user.exceptions;

public class UserNotFoundException extends Exception {
    /**
	 * 
	 */
	private static final long serialVersionUID = -7538680790518417818L;

	public UserNotFoundException(String message) {
        super(message);
    }
}
