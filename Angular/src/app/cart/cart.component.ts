import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalCartCost: number = 0;
  alertMessage='';
  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems(): void {
    this.service.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
      this.calculateTotalCartCost();
    });
  }
  calculateTotalCartCost(): void {
    this.totalCartCost = this.cartItems.reduce(
      (total, cartItem) => total + cartItem.totalFoodItemCost,
      0
    );
  }
  updateQuantity(cartItem: CartItem, newQuantity: number, sign:string): void {
    if (newQuantity <= cartItem.foodItem.availableQuantity) {
      if(sign=='-')newQuantity--;
      if(sign=='+')newQuantity++;
      if (newQuantity <= cartItem.foodItem.availableQuantity) {
      this.service.updateCartItemQuantity(cartItem, newQuantity).subscribe(
        response => {
          console.log(response);
          setTimeout(() => {
            this.ngOnInit(); 
          }, 100);
        }
      );
      }
      else {
        this.showAlertModal('Quantity exceeds available quantity');
      }

    } else {
      this.showAlertModal('Quantity exceeds available quantity');
    }
  }
  removeFromCart(cartItem: CartItem): void {
    this.service.removeFromCart(cartItem).subscribe(
      (response)=>{
        console.log(response);
        setTimeout(() => {
          this.ngOnInit(); 
        }, 100);
      }
    );
  }
  showAlertModal(message:string): void {
    const modal = document.getElementById('alertModal');
    this.alertMessage=message;
    if (modal) {
      modal.style.display = 'block';
    }
  }
  closeAlertModal(): void {
    const modal = document.getElementById('alertModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}