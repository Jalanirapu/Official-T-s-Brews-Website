import { Product, ProductCategory, Review } from './types';

export const PRODUCTS: Product[] = [
  // Coffee Bulk
  {
    id: 'c1',
    name: 'Sumatra Mandheling Reserve',
    description: 'Deep, earthy, and complex. Sold in 5lb bulk bags.',
    price: 85.00,
    image: 'https://picsum.photos/id/425/600/600',
    category: ProductCategory.COFFEE_BULK,
    unit: '5lb Bag'
  },
  {
    id: 'c2',
    name: 'Ethiopian Yirgacheffe',
    description: 'Floral and bright acidity. Perfect for pour-overs.',
    price: 92.50,
    image: 'https://picsum.photos/id/429/600/600',
    category: ProductCategory.COFFEE_BULK,
    unit: '5lb Bag'
  },
  // Subscriptions
  {
    id: 's1',
    name: 'Roaster\'s Choice Box',
    description: 'Monthly delivery of 3 unique single-origin coffees.',
    price: 45.00,
    image: 'https://picsum.photos/id/365/600/600',
    category: ProductCategory.COFFEE_SUB,
    unit: 'Per Month'
  },
  // Hot Chocolate
  {
    id: 'h1',
    name: 'Belgian Dark Cocoa',
    description: 'Rich, 70% dark chocolate powder. Best for cafes.',
    price: 60.00,
    image: 'https://picsum.photos/id/292/600/600',
    category: ProductCategory.HOT_CHOCOLATE,
    unit: '10lb Bulk Box'
  },
  // Cold Drinks
  {
    id: 'l1',
    name: 'Classic Lemonade',
    description: 'Freshly squeezed lemons, cane sugar, and filtered water.',
    price: 18.00,
    image: 'https://picsum.photos/id/430/600/600',
    category: ProductCategory.COLD_DRINK,
    unit: '1 Gallon'
  },
  {
    id: 't1',
    name: 'Southern Sweet Tea',
    description: 'Steeped black tea with pure cane sugar. A classic.',
    price: 15.00,
    image: 'https://picsum.photos/id/225/600/600',
    category: ProductCategory.COLD_DRINK,
    unit: '1 Gallon'
  },
  // Merchandise
  {
    id: 'm1',
    name: 'Ceramic Burr Grinder',
    description: 'Manual grinder for the perfect consistent grind size.',
    price: 42.00,
    image: 'https://picsum.photos/id/250/600/600',
    category: ProductCategory.MERCHANDISE,
    unit: 'Each'
  },
  {
    id: 'm2',
    name: 'Insulated Travel Tumbler',
    description: 'Keeps drinks hot for 12 hours or cold for 24 hours.',
    price: 28.00,
    image: 'https://picsum.photos/id/145/600/600',
    category: ProductCategory.MERCHANDISE,
    unit: 'Each'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah Jenkins',
    rating: 5,
    text: 'The Ethiopian bulk coffee is a game changer for our office!',
    approved: true,
    date: '2023-10-15'
  },
  {
    id: 'r2',
    author: 'Mike Ross',
    rating: 4,
    text: 'Love the sweet tea, wish the shipping was slightly faster.',
    approved: true,
    date: '2023-11-02'
  }
];