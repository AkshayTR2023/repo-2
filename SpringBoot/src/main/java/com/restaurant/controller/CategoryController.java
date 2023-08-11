package com.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.pojo.Category;
import com.restaurant.service.AdminService;
import com.restaurant.service.CartService;
import com.restaurant.service.CategoryService;
import com.restaurant.service.FoodItemService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	CartService cartService;
	@Autowired
	AdminService adminService;
	@Autowired
	CategoryService categoryService;
	@Autowired
	FoodItemService foodItemService;
	
	@PostMapping("/add/{categoryName}")
	public String addCategory(@PathVariable String categoryName) {
		Category testCategory=categoryService.getCategoryByName(categoryName);
		if(testCategory!=null)
			return "0";
		else {
			
			Category category=new Category();
			category.setName(categoryName);
			categoryService.addCategory(category);
			return "1";
		}
	}
	@GetMapping("")
	public List<Category> getCategories(){
		return categoryService.getCategories();
	}
	@GetMapping("/{categoryId}")
	public Category getCategoryById(@PathVariable Long categoryId){
		return categoryService.getCategoryById(categoryId);
	}
	@DeleteMapping("/delete/{categoryId}")
	public String deleteCategory(@PathVariable Long categoryId) {
		
		cartService.deleteFromCartByFoodItems(foodItemService.getFoodItemsByCategoryId(categoryId) );
		categoryService.deleteCategoryById(categoryId);
		return "done";
	}
}
