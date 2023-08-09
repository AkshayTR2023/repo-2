package com.restaurant.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.restaurant.pojo.FoodItem;

public interface FoodItemRepo extends JpaRepository<FoodItem, Long>{
	@Query("SELECT foodItem FROM FoodItem foodItem WHERE foodItem.availableQuantity>0 AND foodItem.enabled=true ")
	public List<FoodItem> findValidFoodItems();


}
