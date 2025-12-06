export enum ProductCategory {
  COFFEE_BULK = 'Coffee (Bulk)',
  COFFEE_SUB = 'Coffee Subscription',
  HOT_CHOCOLATE = 'Hot Chocolate',
  COLD_DRINK = 'Cold Drink (Gallons)',
  MERCHANDISE = 'Merchandise'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  unit: string; // e.g., "per lb", "per gallon", "per box"
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  approved: boolean;
  date: string;
}

export interface ReviewSubmission {
  author: string;
  rating: number;
  text: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  total: number;
  itemsSummary: string;
}

export interface UserProfileData {
  address: string;
  city: string;
  zip: string;
  savedCard: string; // e.g. "**** 1234"
}