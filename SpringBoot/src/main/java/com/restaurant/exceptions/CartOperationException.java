package com.restaurant.exceptions;

public class CartOperationException extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public CartOperationException(String message) {
		super(message);
	}
}
