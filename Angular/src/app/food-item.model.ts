export interface FoodItem {
    foodItemId: number;
    name: string;
    description: string;
    price: number;
    availableQuantity: number;
    quantity?: number;
    category:Category;
    imagePath:string;
  }

  export interface Category{
    categoryId:number;
    name:string;
  }
  