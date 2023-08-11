package com.restaurant.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.pojo.User;

public interface UserRepo extends JpaRepository<User, Long> {

	User findByEmail(String email);
	
	User findByMobileNumber(String mobileNumber);
	
	User findByEmailAndPassword(String email, String password);
}
