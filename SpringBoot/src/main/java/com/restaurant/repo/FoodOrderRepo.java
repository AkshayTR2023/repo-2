package com.restaurant.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.pojo.FoodOrder;

public interface FoodOrderRepo extends JpaRepository<FoodOrder, Long>{

}
