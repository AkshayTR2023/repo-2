package com.restaurant.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.pojo.CartItem;
import com.restaurant.pojo.FoodItem;

public interface CartRepo extends JpaRepository<CartItem, Long> {

	public List<CartItem> findAllByUserId(Long userId);

	public CartItem findByUserIdAndFoodItem(Long userId, FoodItem foodItem);

	public List<CartItem> findByFoodItem(FoodItem foodItem);

}
