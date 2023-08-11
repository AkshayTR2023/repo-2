package com.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.pojo.User;
import com.restaurant.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userService;

	@PostMapping("/register")
	public String registerUser(@RequestBody User user) {
		System.out.println(user.getEmail()+" "+user.getMobileNumber()+" "+user.getName()+" "+user.getPassword());
		User testUser1 = userService.getUserByEmail(user.getEmail());
		if (testUser1 != null)
			return "Email already exists!";
		User testUser2 = userService.getUserByMobileNumber(user.getMobileNumber());
		if (testUser2 != null)
			return "Mobile Number already exists!";
		userService.registerUser(user);
		return "Registered Successfully! login to continue";
	}
	
	@PostMapping("/login")
	public String loginUserCheck(@RequestBody User user) {
		return userService.checkAdminCredentials(user.getEmail(),user.getPassword());
	}
	
	@GetMapping("/email/{userEmail}")
	public User getUserByEmail(@PathVariable String userEmail) {
		userEmail= userEmail.substring(1, userEmail.length()-1);
		return userService.getUserByEmail(userEmail);
	}
	
	@PutMapping("/update")
	public String updateUser(@RequestBody User user) {
		if(userService.updateUser(user)!=null)
		return "done";
		return "0";
	}
}
