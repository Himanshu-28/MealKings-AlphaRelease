package com.exceptions;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException(String message) {
        super("INVALID CREDENTIALS");
    }
}
