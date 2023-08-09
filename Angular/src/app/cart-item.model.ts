import { FoodItem } from "./food-item.model";

export interface CartItem {
    cartItemId: number;
    foodItem: FoodItem;
    userId: number;
    quantity: number;
    totalFoodItemCost: number;
  }
  