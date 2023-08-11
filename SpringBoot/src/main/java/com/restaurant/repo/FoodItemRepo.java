package com.restaurant.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.restaurant.pojo.Category;
import com.restaurant.pojo.FoodItem;

public interface FoodItemRepo extends JpaRepository<FoodItem, Long>{
	@Query("SELECT foodItem FROM FoodItem foodItem WHERE foodItem.availableQuantity>0 AND foodItem.enabled=true ")
	public List<FoodItem> findValidFoodItems(); //For User - Display only available food Items

	public List<FoodItem> findByCategory(Category category); //For Admin- Get All Food Items (by category)

	public FoodItem findByName(String name);


}
