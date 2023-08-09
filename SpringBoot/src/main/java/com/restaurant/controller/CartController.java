package com.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.exceptions.CartOperationException;
import com.restaurant.exceptions.ItemNotFoundException;
import com.restaurant.exceptions.UserNotFoundException;
import com.restaurant.pojo.CartItem;
import com.restaurant.service.CartService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cart")
public class CartController {
	@Autowired
	CartService service;

	@PostMapping("/add")
	public ResponseEntity<String> addItemToCart(@RequestParam("userId") Long userId,
			@RequestParam("foodItemId") Long foodItemId, @RequestParam("quantity") int quantity) {
		CartItem cartItem = new CartItem();
		cartItem.setQuantity(quantity);
		try {
			service.addItemToCart(userId, foodItemId, cartItem);
			return ResponseEntity.ok("Item added to cart successfully");
		} catch (ItemNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food item Not Found!");
		} catch (UserNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body("Oops, something went wrong! Please sign in again!");

		} catch (CartOperationException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body("Oops, something went wrong! Please add to cart again");
		}
	}

	@PutMapping("/update/{cartId}/{newQuantity}")
	public String updateCartItem(@PathVariable Long cartId,@PathVariable int newQuantity) {
		if(service.updateCartItem(cartId,newQuantity)!=null)
		return "done";
		return ":(";
	}

	@GetMapping("/{userId}")
	public List<CartItem> getWholeCart(@PathVariable Long userId) {
		return service.getWholeCartByUserId(userId);
	}

	@DeleteMapping("/delete/{cartId}")
	public String deleteFromCart(@PathVariable Long cartId) {
		service.deleteFromCart(cartId);
		return "done";
		
	}
}
