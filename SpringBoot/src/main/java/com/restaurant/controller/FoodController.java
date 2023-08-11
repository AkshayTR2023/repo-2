package com.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.pojo.FoodItem;
import com.restaurant.service.AdminService;
import com.restaurant.service.CartService;
import com.restaurant.service.CategoryService;
import com.restaurant.service.FoodItemService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/foodItems")
public class FoodController {
	@Autowired
	CartService cartService;
	@Autowired
	AdminService adminService;
	@Autowired
	CategoryService categoryService;
	@Autowired
	FoodItemService foodItemService;
	
	
	
	@GetMapping("")
	public List<FoodItem> getValidFoodItems(){
		return foodItemService.getFoodItems();
	}
	@GetMapping("/{categoryId}")
	public List<FoodItem> getFoodItemsByCategory(@PathVariable Long categoryId){
		return foodItemService.getFoodItemsByCategoryId(categoryId);
	}
	@PostMapping("/{categoryId}")
	public String addFoodItem(@PathVariable Long categoryId,@RequestBody FoodItem foodItem) {
		FoodItem testFoodItem=foodItemService.getFoodByName(foodItem.getName());
		if(testFoodItem!=null)
			return "0";
		else {
			foodItem.setCategory(categoryService.getCategoryById(categoryId));
			foodItemService.addFoodItem(foodItem);
			return "1";
		}
	}
	@PutMapping("")
	public String editFoodItem(@RequestBody FoodItem foodItem) {
		if(foodItemService.editFoodItem(foodItem)!=null)
			return "done";
		return "0";
	}
	@DeleteMapping("delete/{foodItemId}")
	public String deleteFoodItem(@PathVariable Long foodItemId) {
		foodItemService.deleteFoodItemById(foodItemId);
			return "done";
	}
}
