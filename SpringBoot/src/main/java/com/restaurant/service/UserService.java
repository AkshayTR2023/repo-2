package com.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.pojo.User;
import com.restaurant.repo.UserRepo;

@Service
public class UserService {
	@Autowired
	UserRepo userRepo;

	public User getUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}

	public User getUserByMobileNumber(String mobileNumber) {
		return userRepo.findByMobileNumber(mobileNumber);
	}

	public void registerUser(User user) {
		userRepo.save(user);
	}

	public String checkAdminCredentials(String email, String password) {
		User user = userRepo.findByEmailAndPassword(email, password);
		if (user == null)
			return "invalid";
		else
			return user.getEmail();
	}

	public User updateUser(User user) {
		return userRepo.save(user);
	}
}
