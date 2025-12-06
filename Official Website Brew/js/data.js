export const PRODUCTS = [
  // Coffee Bulk
  {
    id: 'c1',
    name: 'Sumatra Mandheling Reserve',
    description: 'Deep, earthy, and complex. Sold in 5lb bulk bags.',
    price: 85.00,
    image: 'https://picsum.photos/id/425/600/600',
    category: 'Coffee (Bulk)',
    unit: '5lb Bag'
  },
  {
    id: 'c2',
    name: 'Ethiopian Yirgacheffe',
    description: 'Floral and bright acidity. Perfect for pour-overs.',
    price: 92.50,
    image: 'https://picsum.photos/id/429/600/600',
    category: 'Coffee (Bulk)',
    unit: '5lb Bag'
  },
  // Subscriptions
  {
    id: 's1',
    name: 'Roaster\'s Choice Box',
    description: 'Monthly delivery of 3 unique single-origin coffees.',
    price: 45.00,
    image: 'https://picsum.photos/id/365/600/600',
    category: 'Coffee Subscription',
    unit: 'Per Month'
  },
  // Hot Chocolate
  {
    id: 'h1',
    name: 'Belgian Dark Cocoa',
    description: 'Rich, 70% dark chocolate powder. Best for cafes.',
    price: 60.00,
    image: 'https://picsum.photos/id/292/600/600',
    category: 'Hot Chocolate',
    unit: '10lb Bulk Box'
  },
  // Cold Drinks
  {
    id: 'l1',
    name: 'Classic Lemonade',
    description: 'Freshly squeezed lemons, cane sugar, and filtered water.',
    price: 18.00,
    image: 'https://picsum.photos/id/430/600/600',
    category: 'Cold Drink (Gallons)',
    unit: '1 Gallon'
  },
  {
    id: 't1',
    name: 'Southern Sweet Tea',
    description: 'Steeped black tea with pure cane sugar. A classic.',
    price: 15.00,
    image: 'https://picsum.photos/id/225/600/600',
    category: 'Cold Drink (Gallons)',
    unit: '1 Gallon'
  },
  // Merchandise
  {
    id: 'm1',
    name: 'Ceramic Burr Grinder',
    description: 'Manual grinder for the perfect consistent grind size.',
    price: 42.00,
    image: 'https://picsum.photos/id/250/600/600',
    category: 'Merchandise',
    unit: 'Each'
  },
  {
    id: 'm2',
    name: 'Insulated Travel Tumbler',
    description: 'Keeps drinks hot for 12 hours or cold for 24 hours.',
    price: 28.00,
    image: 'https://picsum.photos/id/145/600/600',
    category: 'Merchandise',
    unit: 'Each'
  }
];

export const INITIAL_REVIEWS = [
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

export const MOCK_ORDERS = [
    { id: 'ORD-2023-881', date: '2023-12-01', status: 'Delivered', total: 45.00, itemsSummary: 'Roaster\'s Choice Box' },
    { id: 'ORD-2023-902', date: '2024-01-15', status: 'Shipped', total: 108.00, itemsSummary: 'Sumatra Mandheling (5lb), Classic Lemonade' },
    { id: 'ORD-2024-004', date: '2024-02-10', status: 'Processing', total: 28.00, itemsSummary: 'Insulated Travel Tumbler' }
];
