package com.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.pojo.Category;
import com.restaurant.repo.CartRepo;
import com.restaurant.repo.CategoryRepo;
import com.restaurant.repo.FoodItemRepo;

@Service
public class CategoryService {
	@Autowired
	FoodItemRepo foodItemRepo;
	@Autowired
	CategoryRepo categoryRepo;
	@Autowired
	CartRepo cartRepo;
	public List<Category> getCategories() {
		return categoryRepo.findAll();
	}
	public Category getCategoryByName(String categoryName) {
		return categoryRepo.findByName(categoryName);
	}
	public void addCategory(Category category) {
		categoryRepo.save(category);
	}
	public void deleteCategoryById(Long categoryId) {
		categoryRepo.deleteById(categoryId);
		
	}
	public Category getCategoryById(Long categoryId) {
		return categoryRepo.findById(categoryId).orElse(null);
	}
}
