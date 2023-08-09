package com.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.pojo.FoodItem;
import com.restaurant.service.CartService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/foodItems")
public class FoodController {
	@Autowired
	CartService service;
	@GetMapping("")
	public List<FoodItem> getValidFoodItems(){
		return service.getFoodItems();
	}
}
