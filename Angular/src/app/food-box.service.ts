import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CartItem } from './model-classes/cart-item.model';
import { Observable } from 'rxjs';
import { FoodItem } from './model-classes/food-item.model';
import { Category } from './model-classes/category.model';
import { Admin } from './model-classes/admin.model';
import { User } from './model-classes/user.model';

@Injectable({
  providedIn: 'root'
})
export class FoodBoxService implements OnInit{
  changeAdminPassword(oldPassword: string, newPassword: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = "http://localhost:8084";
  private user:User;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getUserByEmail(sessionStorage.getItem("userSession")).subscribe(

      user => {
        this.user = user;
      }
    )
  }
  
    
  
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cart/${this.user.userId}`);
  }

  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.baseUrl}/foodItems`);
  }
  getFoodItemsByCategory(categoryId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.baseUrl}/foodItems/${categoryId}`);;
  }
  addFoodItem(categoryId: number, newFoodItem: FoodItem) {
    return this.http.post(`${this.baseUrl}/foodItems/${categoryId}`, newFoodItem, { responseType: 'text' });
  }
  editFoodItem(foodItem: FoodItem): Observable<string> {
    return this.http.put(`${this.baseUrl}/foodItems`, foodItem, { responseType: 'text' });
  }
  deleteFoodItem(foodItemId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/foodItems/delete/${foodItemId}`, { responseType: 'text' });;
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/${categoryId}`);
  }
  addCategory(categoryName: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/category/add/${categoryName}`, null, { responseType: 'text' });
  }
  deleteCategory(categoryId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/category/delete/${categoryId}`, { responseType: 'text' });
  }

  addToCart(foodItemId: number, quantity: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/cart/add?userId=${this.user.userId}&foodItemId=${foodItemId}&quantity=${quantity}`, null, { responseType: 'text' });
  }
  updateCartItemQuantity(cartItem: CartItem, newQuantity: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/cart/update/${cartItem.cartItemId}/${newQuantity}`, null, { responseType: 'text' });
  }

  removeFromCart(cartItem: CartItem): Observable<string> {
    return this.http.delete(`${this.baseUrl}/cart/delete/${cartItem.cartItemId}`, { responseType: 'text' })
  }


  registerAdmin(admin: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/admin/register`, admin, { responseType: 'text' });
  }

  loginAdmin(adminCreds: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/admin/login`, adminCreds, { responseType: 'text' });
  }
  getAdminByEmployeeId(adminEmployeeId:string):Observable<Admin>{
    return this.http.get<Admin>(`${this.baseUrl}/admin/employeeId/${adminEmployeeId}`);
  }
  updateAdmin(admin:Admin):Observable<string>{
    return this.http.put(`${this.baseUrl}/admin/update`, admin, { responseType: 'text' });
  }

  registerUser(user: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/user/register`, user, { responseType: 'text' });
  }

  loginUser(userCreds: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/user/login`, userCreds, { responseType: 'text' });
  }
  getUserByEmail(userEmail:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/user/email/${userEmail}`);
  }
  updateUser(user:User):Observable<string>{
    return this.http.put(`${this.baseUrl}/user/update`, user, { responseType: 'text' });
  }
}
