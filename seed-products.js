const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Sample products available on multiple suppliers
const products = [
  {
    name: 'Apple AirPods Pro',
    category: 'Electronics',
    description: 'Premium wireless earbuds with active noise cancellation',
    image_url: 'https://via.placeholder.com/200?text=AirPods+Pro',
    prices: [
      { supplier_id: 'amazon', price: 249.99 },
      { supplier_id: 'smyths', price: 259.99 },
      { supplier_id: 'ebay', price: 245.00 }
    ]
  },
  {
    name: 'Samsung Galaxy Watch 5',
    category: 'Electronics',
    description: 'Advanced smartwatch with health tracking and 5G',
    image_url: 'https://via.placeholder.com/200?text=Galaxy+Watch+5',
    prices: [
      { supplier_id: 'amazon', price: 399.99 },
      { supplier_id: 'ebay', price: 389.99 },
      { supplier_id: 'decathlon', price: 415.00 }
    ]
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Electronics',
    description: 'Industry-leading noise-canceling headphones',
    image_url: 'https://via.placeholder.com/200?text=Sony+Headphones',
    prices: [
      { supplier_id: 'amazon', price: 379.99 },
      { supplier_id: 'ebay', price: 359.99 }
    ]
  },
  {
    name: 'Nike Revolution 7 Running Shoes',
    category: 'Sports',
    description: 'Lightweight and comfortable running shoes',
    image_url: 'https://via.placeholder.com/200?text=Nike+Shoes',
    prices: [
      { supplier_id: 'decathlon', price: 69.99 },
      { supplier_id: 'amazon', price: 75.99 },
      { supplier_id: 'smyths', price: 72.50 }
    ]
  },
  {
    name: 'LEGO Harry Potter Hogwarts Castle',
    category: 'Toys',
    description: 'Iconic LEGO building set with 6,000+ pieces',
    image_url: 'https://via.placeholder.com/200?text=LEGO+Hogwarts',
    prices: [
      { supplier_id: 'smyths', price: 499.99 },
      { supplier_id: 'amazon', price: 489.99 },
      { supplier_id: 'ebay', price: 475.00 }
    ]
  },
  {
    name: 'Decathlon Running Backpack',
    category: 'Sports',
    description: 'Lightweight and durable running backpack with storage',
    image_url: 'https://via.placeholder.com/200?text=Running+Backpack',
    prices: [
      { supplier_id: 'decathlon', price: 39.99 },
      { supplier_id: 'amazon', price: 44.99 }
    ]
  },
  {
    name: 'Canon EOS M50 Mark II Camera',
    category: 'Electronics',
    description: 'Compact mirrorless camera for content creators',
    image_url: 'https://via.placeholder.com/200?text=Canon+Camera',
    prices: [
      { supplier_id: 'amazon', price: 699.99 },
      { supplier_id: 'ebay', price: 679.99 }
    ]
  },
  {
    name: 'Nintendo Switch OLED',
    category: 'Electronics',
    description: 'Latest gaming console with OLED display',
    image_url: 'https://via.placeholder.com/200?text=Switch+OLED',
    prices: [
      { supplier_id: 'smyths', price: 349.99 },
      { supplier_id: 'amazon', price: 339.99 },
      { supplier_id: 'ebay', price: 329.99 }
    ]
  },
  {
    name: 'Apple iPad Air 5',
    category: 'Electronics',
    description: 'Powerful tablet with M1 chip and 10.9-inch display',
    image_url: 'https://via.placeholder.com/200?text=iPad+Air+5',
    prices: [
      { supplier_id: 'amazon', price: 649.99 },
      { supplier_id: 'smyths', price: 659.99 },
      { supplier_id: 'ebay', price: 629.99 }
    ]
  },
  {
    name: 'DJI Mini 3 Pro Drone',
    category: 'Electronics',
    description: 'Compact professional drone with 4K camera',
    image_url: 'https://via.placeholder.com/200?text=DJI+Drone',
    prices: [
      { supplier_id: 'amazon', price: 759.99 },
      { supplier_id: 'ebay', price: 749.99 }
    ]
  },
  {
    name: 'Apple MacBook Air M2',
    category: 'Electronics',
    description: '13-inch laptop with M2 chip and 8GB RAM',
    image_url: 'https://via.placeholder.com/200?text=MacBook+Air+M2',
    prices: [
      { supplier_id: 'amazon', price: 1299.99 },
      { supplier_id: 'ebay', price: 1249.99 },
      { supplier_id: 'smyths', price: 1319.99 }
    ]
  },
  {
    name: 'Samsung 65-inch 4K Smart TV',
    category: 'Electronics',
    description: '4K resolution with HDR and smart apps',
    image_url: 'https://via.placeholder.com/200?text=Samsung+65+TV',
    prices: [
      { supplier_id: 'amazon', price: 799.99 },
      { supplier_id: 'ebay', price: 779.99 }
    ]
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    category: 'Electronics',
    description: 'Cordless vacuum with laser detection technology',
    image_url: 'https://via.placeholder.com/200?text=Dyson+Vacuum',
    prices: [
      { supplier_id: 'amazon', price: 749.99 },
      { supplier_id: 'ebay', price: 729.99 },
      { supplier_id: 'decathlon', price: 769.99 }
    ]
  },
  {
    name: 'Adidas Ultraboost 23 Running Shoes',
    category: 'Sports',
    description: 'High-performance running shoes with Boost technology',
    image_url: 'https://via.placeholder.com/200?text=Adidas+Ultraboost',
    prices: [
      { supplier_id: 'amazon', price: 189.99 },
      { supplier_id: 'decathlon', price: 179.99 },
      { supplier_id: 'smyths', price: 199.99 }
    ]
  },
  {
    name: 'Fitbit Charge 6 Fitness Tracker',
    category: 'Electronics',
    description: 'Advanced fitness tracker with heart rate monitor',
    image_url: 'https://via.placeholder.com/200?text=Fitbit+Charge+6',
    prices: [
      { supplier_id: 'amazon', price: 159.99 },
      { supplier_id: 'ebay', price: 149.99 }
    ]
  },
  {
    name: 'Philips Hue Smart Light Bulbs (4-Pack)',
    category: 'Electronics',
    description: 'Smart LED bulbs with 16 million colors',
    image_url: 'https://via.placeholder.com/200?text=Philips+Hue',
    prices: [
      { supplier_id: 'amazon', price: 199.99 },
      { supplier_id: 'ebay', price: 189.99 }
    ]
  },
  {
    name: 'GoPro Hero 11 Black',
    category: 'Electronics',
    description: 'Professional action camera with 5.3K video',
    image_url: 'https://via.placeholder.com/200?text=GoPro+Hero+11',
    prices: [
      { supplier_id: 'amazon', price: 499.99 },
      { supplier_id: 'ebay', price: 479.99 },
      { supplier_id: 'smyths', price: 519.99 }
    ]
  },
  {
    name: 'Logitech MX Master 3S Mouse',
    category: 'Electronics',
    description: 'Professional wireless mouse with precision control',
    image_url: 'https://via.placeholder.com/200?text=Logitech+Mouse',
    prices: [
      { supplier_id: 'amazon', price: 99.99 },
      { supplier_id: 'ebay', price: 89.99 }
    ]
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    category: 'Home & Kitchen',
    description: 'Multi-use pressure cooker and slow cooker',
    image_url: 'https://via.placeholder.com/200?text=Instant+Pot',
    prices: [
      { supplier_id: 'amazon', price: 79.99 },
      { supplier_id: 'ebay', price: 74.99 },
      { supplier_id: 'decathlon', price: 84.99 }
    ]
  },
  {
    name: 'Nespresso Vertuo Next Coffee Machine',
    category: 'Home & Kitchen',
    description: 'Automatic capsule coffee machine with milk frother',
    image_url: 'https://via.placeholder.com/200?text=Nespresso',
    prices: [
      { supplier_id: 'amazon', price: 139.99 },
      { supplier_id: 'ebay', price: 129.99 }
    ]
  },
  {
    name: 'LEGO Marvel Avengers Tower',
    category: 'Toys',
    description: 'Epic LEGO set with 4,000+ pieces and minifigures',
    image_url: 'https://via.placeholder.com/200?text=LEGO+Tower',
    prices: [
      { supplier_id: 'smyths', price: 549.99 },
      { supplier_id: 'amazon', price: 529.99 },
      { supplier_id: 'ebay', price: 499.99 }
    ]
  },
  {
    name: 'Jbl Flip 6 Portable Speaker',
    category: 'Electronics',
    description: 'Waterproof portable Bluetooth speaker',
    image_url: 'https://via.placeholder.com/200?text=JBL+Flip+6',
    prices: [
      { supplier_id: 'amazon', price: 119.99 },
      { supplier_id: 'ebay', price: 109.99 },
      { supplier_id: 'smyths', price: 129.99 }
    ]
  },
  {
    name: 'Microsoft Surface Pro 9',
    category: 'Electronics',
    description: '13-inch 2-in-1 tablet/laptop with Intel processor',
    image_url: 'https://via.placeholder.com/200?text=Surface+Pro+9',
    prices: [
      { supplier_id: 'amazon', price: 1099.99 },
      { supplier_id: 'ebay', price: 1049.99 }
    ]
  },
  {
    name: 'Sony PS5 Console',
    category: 'Electronics',
    description: 'Latest PlayStation gaming console',
    image_url: 'https://via.placeholder.com/200?text=PS5+Console',
    prices: [
      { supplier_id: 'smyths', price: 549.99 },
      { supplier_id: 'amazon', price: 539.99 },
      { supplier_id: 'ebay', price: 519.99 }
    ]
  },
  {
    name: 'Lenovo IdeaPad 5 Laptop',
    category: 'Electronics',
    description: '15.6-inch laptop with AMD Ryzen processor',
    image_url: 'https://via.placeholder.com/200?text=Lenovo+IdeaPad',
    prices: [
      { supplier_id: 'amazon', price: 599.99 },
      { supplier_id: 'ebay', price: 579.99 },
      { supplier_id: 'decathlon', price: 619.99 }
    ]
  },
  {
    name: 'Oculus Meta Quest 3',
    category: 'Electronics',
    description: 'Virtual reality headset with mixed reality',
    image_url: 'https://via.placeholder.com/200?text=Meta+Quest+3',
    prices: [
      { supplier_id: 'amazon', price: 549.99 },
      { supplier_id: 'ebay', price: 529.99 }
    ]
  },
  {
    name: 'Corsair RGB Mechanical Keyboard',
    category: 'Electronics',
    description: 'Gaming keyboard with Cherry MX switches',
    image_url: 'https://via.placeholder.com/200?text=Corsair+Keyboard',
    prices: [
      { supplier_id: 'amazon', price: 149.99 },
      { supplier_id: 'ebay', price: 139.99 }
    ]
  },
  {
    name: 'Under Armour Men\'s Running Shoes',
    category: 'Sports',
    description: 'Comfortable athletic shoes for running and training',
    image_url: 'https://via.placeholder.com/200?text=Under+Armour',
    prices: [
      { supplier_id: 'amazon', price: 129.99 },
      { supplier_id: 'decathlon', price: 119.99 },
      { supplier_id: 'smyths', price: 139.99 }
    ]
  },
  {
    name: 'Garmin Fenix 7 Smartwatch',
    category: 'Electronics',
    description: 'Premium sports smartwatch with GPS',
    image_url: 'https://via.placeholder.com/200?text=Garmin+Fenix+7',
    prices: [
      { supplier_id: 'amazon', price: 699.99 },
      { supplier_id: 'ebay', price: 679.99 }
    ]
  },
  {
    name: 'Bose QuietComfort 45 Headphones',
    category: 'Electronics',
    description: 'Premium noise-cancelling wireless headphones',
    image_url: 'https://via.placeholder.com/200?text=Bose+QC45',
    prices: [
      { supplier_id: 'amazon', price: 379.99 },
      { supplier_id: 'ebay', price: 359.99 },
      { supplier_id: 'smyths', price: 399.99 }
    ]
  }
];

async function seedProducts() {
  try {
    console.log('Starting to seed products...');
    
    for (const product of products) {
      // Add product
      const productResponse = await axios.post(`${BASE_URL}/products`, {
        name: product.name,
        category: product.category,
        description: product.description,
        image_url: product.image_url
      });
      
      const productId = productResponse.data.id;
      console.log(`✓ Added product: ${product.name}`);
      
      // Add prices for this product
      for (const priceData of product.prices) {
        await axios.post(`${BASE_URL}/product-prices`, {
          product_id: productId,
          supplier_id: priceData.supplier_id,
          price: priceData.price,
          currency: 'EUR'
        });
      }
      
      console.log(`  ✓ Added ${product.prices.length} price entries`);
    }
    
    console.log('\n✅ All products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
}

seedProducts();
