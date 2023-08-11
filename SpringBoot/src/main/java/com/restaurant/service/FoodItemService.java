package com.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.pojo.CartItem;
import com.restaurant.pojo.Category;
import com.restaurant.pojo.FoodItem;
import com.restaurant.repo.CartRepo;
import com.restaurant.repo.CategoryRepo;
import com.restaurant.repo.FoodItemRepo;

@Service
public class FoodItemService {
	@Autowired
	FoodItemRepo foodItemRepo;
	@Autowired
	CategoryRepo categoryRepo;
	@Autowired
	CartRepo cartRepo;

	public List<FoodItem> getFoodItems() {
		return foodItemRepo.findValidFoodItems();
	}
	
	public List<FoodItem> getFoodItemsByCategoryId(Long categoryId) {
		Category category=categoryRepo.findById(categoryId).get();
		return foodItemRepo.findByCategory(category);
		
	}
	public FoodItem getFoodByName(String name) {
		return foodItemRepo.findByName(name);
	}
	public FoodItem addFoodItem(FoodItem foodItem) {
		return foodItemRepo.save(foodItem);
		
	}
	public  FoodItem editFoodItem(FoodItem foodItem) {
		List<CartItem> cartItems=cartRepo.findByFoodItem(foodItem);
		for(CartItem cartItem:cartItems) {
			cartItem.setTotalFoodItemCost(foodItem.getDiscountedPrice()*cartItem.getQuantity());
			cartRepo.save(cartItem);
		}
		return foodItemRepo.save(foodItem);
	}
	public  void deleteFoodItemById(Long foodItemId) {
		FoodItem foodItem=foodItemRepo.findById(foodItemId).get();
		List<CartItem> cartItems=cartRepo.findByFoodItem(foodItem);
		for(CartItem cartItem:cartItems) {
		if(cartItem!=null)
		cartRepo.delete(cartItem);
		}
		foodItemRepo.deleteById(foodItemId);
	}
}
