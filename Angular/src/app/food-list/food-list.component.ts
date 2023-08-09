import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Category, FoodItem } from '../food-item.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  constructor(private service: CartService) { }
  foodItems: FoodItem[] = [];
  quantities: number[] = [];
  filteredFoodItems: FoodItem[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  searchQuery = '';
  selectedSortOption: string = 'default';
  alertMessage='';
  ngOnInit(): void {
    this.getCategories();
    this.getFoodItems();
  }
  getCategories() {
    this.service.getCategories().subscribe(categories => {
      this.categories = categories;

    });
  }

  getFoodItems(): void {
    this.service.getFoodItems().subscribe(foodItems => {
      this.foodItems = foodItems;
      this.filteredFoodItems = foodItems;
      this.initializeQuantities();
    });
  }
  initializeQuantities(): void {
    this.quantities = new Array(this.foodItems.length).fill(1);
  }
  addToCart(foodItem: FoodItem, quantity: number): void {
    if (quantity <= 0) {
      this.showAlertModal('Please select a valid quantity');
    }
    else if (quantity <= foodItem.availableQuantity) {
      this.service.addToCart(foodItem.foodItemId, quantity).subscribe(
        response => {
          this.showSuccessModal();}
      );


    } else {
      this.showAlertModal('Quantity exceeds available quantity');
    }
  }
  showSuccessModal(): void {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  closeSuccessModal(): void {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'none';
    }
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
  increaseQuantity(i: number): void {
    this.quantities[i]++;
  }

  decreaseQuantity(i: number): void {
    this.quantities[i]--;
  }
  filterByCategory(category: Category | null): void {
    this.selectedCategory = category;
    if (category) {
      this.filteredFoodItems = this.foodItems.filter(
        foodItem => foodItem.category.categoryId === category.categoryId
        
      );
    } else {
      this.filteredFoodItems = this.foodItems;
    }
  }
  applyFilters(): void {
    this.filterByCategory(this.selectedCategory);
    this.filteredFoodItems = this.filteredFoodItems.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    if (this.selectedSortOption === 'lowToHigh') {
      this.filteredFoodItems.sort((a, b) => a.price - b.price);
    } else if (this.selectedSortOption === 'highToLow') {
      this.filteredFoodItems.sort((a, b) => b.price - a.price);
    }

    if (this.searchQuery) {
      this.filteredFoodItems = this.filteredFoodItems.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


}
