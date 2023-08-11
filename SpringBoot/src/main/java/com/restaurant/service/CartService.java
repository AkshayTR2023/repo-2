package com.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.exceptions.CartOperationException;
import com.restaurant.exceptions.ItemNotFoundException;
import com.restaurant.exceptions.UserNotFoundException;
import com.restaurant.pojo.CartItem;
import com.restaurant.pojo.FoodItem;
import com.restaurant.pojo.User;
import com.restaurant.repo.AdminRepo;
import com.restaurant.repo.CartRepo;
import com.restaurant.repo.CategoryRepo;
import com.restaurant.repo.FoodItemRepo;
import com.restaurant.repo.UserRepo;

@Service
public class CartService {

	@Autowired
	CartRepo cartRepo;
	@Autowired
	UserRepo userRepo;
	@Autowired
	FoodItemRepo foodItemRepo;
	@Autowired
	CategoryRepo categoryRepo;
	@Autowired
	AdminRepo adminRepo;

	public void addItemToCart(Long userId, Long foodItemId, CartItem cartItem) {
		FoodItem foodItem = foodItemRepo.findById(foodItemId).orElse(null);
		if (foodItem == null)
			throw new ItemNotFoundException("Item Not Found");
		User user = userRepo.findById(userId).orElse(null);
		if (user == null)
			throw new UserNotFoundException("User not found");

		CartItem existingCartItem = cartRepo.findByUserIdAndFoodItem(userId, foodItem);
		if (existingCartItem != null) {
			existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItem.getQuantity());
			existingCartItem.setTotalFoodItemCost(foodItem.getDiscountedPrice() * existingCartItem.getQuantity());
			cartRepo.save(existingCartItem);
		}

		else {
			cartItem.setFoodItem(foodItem);
			cartItem.setUserId(userId);
			cartItem.setTotalFoodItemCost(foodItem.getDiscountedPrice() * cartItem.getQuantity());
			CartItem cart = cartRepo.save(cartItem);
			if (cart == null) {
				throw new CartOperationException("Failed to add Item");
			}
		}
	}

	public CartItem updateCartItem(Long cartItemId, int newQuantity) {
		CartItem cartItem = cartRepo.findById(cartItemId).orElse(null);
		cartItem.setQuantity(newQuantity);
		if (cartItem.getQuantity() == 0) {
			cartRepo.deleteById(cartItemId);
			return null;
		}
		cartItem.setTotalFoodItemCost(cartItem.getFoodItem().getDiscountedPrice() * cartItem.getQuantity());
		return cartRepo.save(cartItem);
	}

	public List<CartItem> getWholeCartByUserId(Long userId) {
		return cartRepo.findAllByUserId(userId);
	}

	public CartItem getCartItemById(Long cartId) {
		return cartRepo.findById(cartId).orElse(null);
	}

	public void deleteFromCart(Long cartId) {
		cartRepo.deleteById(cartId);
	}

	public void deleteFromCartByFoodItems(List<FoodItem> foodItems) {
		for (FoodItem foodItem : foodItems) {
			List<CartItem> cartItems = cartRepo.findByFoodItem(foodItem);
			for (CartItem cartItem : cartItems) {
				if (cartItem != null)
					cartRepo.delete(cartItem);
			}
		}
	}

	// ===================================================================//

}
