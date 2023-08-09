import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { Observable } from 'rxjs';
import { Category, FoodItem } from './food-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private baseUrl = "http://localhost:8084";
  constructor(private http: HttpClient) { }
  private userId = 1;
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cart/${this.userId}`);
  }

  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.baseUrl}/foodItems`);
  }
  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }
  addToCart(foodItemId: number, quantity: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/cart/add?userId=${this.userId}&foodItemId=${foodItemId}&quantity=${quantity}`, null, { responseType: 'text' });
  }
  updateCartItemQuantity(cartItem: CartItem, newQuantity: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/cart/update/${cartItem.cartItemId}/${newQuantity}`, null, { responseType: 'text' });
  }

  removeFromCart(cartItem: CartItem): Observable<string>  {
    return this.http.delete(`${this.baseUrl}/cart/delete/${cartItem.cartItemId}`,{ responseType: 'text' })
  }
}
