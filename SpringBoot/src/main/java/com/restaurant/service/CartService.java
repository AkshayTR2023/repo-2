package com.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.exceptions.CartOperationException;
import com.restaurant.exceptions.ItemNotFoundException;
import com.restaurant.exceptions.UserNotFoundException;
import com.restaurant.pojo.CartItem;
import com.restaurant.pojo.Category;
import com.restaurant.pojo.FoodItem;
import com.restaurant.pojo.User;
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
	public void addItemToCart(Long userId,Long foodItemId, CartItem cartItem) {
				FoodItem foodItem=foodItemRepo.findById(foodItemId).orElse(null);
				if (foodItem==null)
					throw new ItemNotFoundException("Item Not Found");
				User user = userRepo.findById(userId).orElse(null);
				if(user==null)
					throw new UserNotFoundException("User not found");
				
				CartItem existingCartItem = cartRepo.findByUserIdAndFoodItem(userId, foodItem);
				if (existingCartItem != null) {
			        existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItem.getQuantity());
			        existingCartItem.setTotalFoodItemCost(foodItem.getPrice() * existingCartItem.getQuantity());
			        cartRepo.save(existingCartItem);
			    }
				
				else {
			        cartItem.setFoodItem(foodItem);
			        cartItem.setUserId(userId);
			        cartItem.setTotalFoodItemCost(foodItem.getPrice() * cartItem.getQuantity());
			        CartItem cart = cartRepo.save(cartItem);
			        if (cart == null) {
			            throw new CartOperationException("Failed to add Item");
			        }
			    }
	}
	public CartItem updateCartItem(Long cartItemId, int newQuantity) {
		CartItem cartItem=cartRepo.findById(cartItemId).orElse(null);
		cartItem.setQuantity(newQuantity);
		if(cartItem.getQuantity()==0) {
			cartRepo.deleteById(cartItemId);
			return null;
		}
		cartItem.setTotalFoodItemCost(cartItem.getFoodItem().getPrice()*cartItem.getQuantity());
		return cartRepo.save(cartItem);
	}
//	public CartItem increaseItem(Long cartItemId) {
//		CartItem cartItem=cartRepo.findById(cartItemId).orElse(null);
//		cartItem.setQuantity(cartItem.getQuantity()+1);
//		cartItem.setTotalFoodItemCost(cartItem.getFoodItem().getPrice()*cartItem.getQuantity());
//		cartRepo.save(cartItem);
//		return cartItem;
//	}
//	
//	public CartItem decreaseItem(Long cartItemId) {
//		CartItem cartItem=cartRepo.findById(cartItemId).orElse(null);
//		cartItem.setQuantity(cartItem.getQuantity()-1);
//		if(cartItem.getQuantity()==0) {
//			cartRepo.deleteById(cartItemId);
//			return null;
//		}
//		cartItem.setTotalFoodItemCost(cartItem.getFoodItem().getPrice()*cartItem.getQuantity());
//		cartRepo.save(cartItem);
//		return cartItem;
//	}

	public List<CartItem> getWholeCartByUserId(Long userId) {
		return cartRepo.findAllByUserId(userId);
	}

	public CartItem getCartItemById(Long cartId) {
		return cartRepo.findById(cartId).orElse(null);
	}

	public void deleteFromCart(Long cartId) {
		cartRepo.deleteById(cartId);		
	}
	
	public List<FoodItem> getFoodItems() {
		return foodItemRepo.findValidFoodItems();
	}
	public List<Category> getCategories() {
		return categoryRepo.findAll();
	}

	
}
