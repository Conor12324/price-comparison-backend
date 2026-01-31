const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Irish-specific products available from Irish retailers
const irishProducts = [
  {
    name: 'Nike Dunk Low Retro',
    category: 'Sports',
    description: 'Classic Nike basketball-inspired shoes',
    image_url: 'https://via.placeholder.com/200?text=Nike+Dunk',
    prices: [
      { supplier_id: 'jd_sports', price: 119.99 },
      { supplier_id: 'sports_direct', price: 99.99 },
      { supplier_id: 'dunnes', price: 109.99 }
    ]
  },
  {
    name: 'Adidas Gazelle Indoor',
    category: 'Sports',
    description: 'Retro Adidas indoor training shoe',
    image_url: 'https://via.placeholder.com/200?text=Adidas+Gazelle',
    prices: [
      { supplier_id: 'jd_sports', price: 99.99 },
      { supplier_id: 'sports_direct', price: 79.99 },
      { supplier_id: 'dunnes', price: 94.99 }
    ]
  },
  {
    name: 'The North Face Puffer Jacket',
    category: 'Sports',
    description: 'Premium waterproof winter puffer jacket',
    image_url: 'https://via.placeholder.com/200?text=North+Face+Jacket',
    prices: [
      { supplier_id: 'jd_sports', price: 249.99 },
      { supplier_id: 'sports_direct', price: 199.99 },
      { supplier_id: 'penneys', price: 59.99 }
    ]
  },
  {
    name: 'Levi\'s 501 Jeans',
    category: 'Fashion',
    description: 'Classic Levi\'s denim jeans',
    image_url: 'https://via.placeholder.com/200?text=Levis+501',
    prices: [
      { supplier_id: 'penneys', price: 49.99 },
      { supplier_id: 'dunnes', price: 59.99 },
      { supplier_id: 'jd_sports', price: 99.99 }
    ]
  },
  {
    name: 'Apple Watch Series 9',
    category: 'Electronics',
    description: 'Latest Apple smartwatch with fitness tracking',
    image_url: 'https://via.placeholder.com/200?text=Apple+Watch+9',
    prices: [
      { supplier_id: 'harvey_norman', price: 429.99 },
      { supplier_id: 'argos_ireland', price: 419.99 },
      { supplier_id: 'amazon', price: 399.99 }
    ]
  },
  {
    name: 'iPad (10th Generation)',
    category: 'Electronics',
    description: '10.9-inch tablet with A14 Bionic',
    image_url: 'https://via.placeholder.com/200?text=iPad+10gen',
    prices: [
      { supplier_id: 'harvey_norman', price: 499.99 },
      { supplier_id: 'argos_ireland', price: 479.99 },
      { supplier_id: 'amazon', price: 449.99 }
    ]
  },
  {
    name: 'Samsung Galaxy Buds2',
    category: 'Electronics',
    description: 'True wireless earbuds with noise cancellation',
    image_url: 'https://via.placeholder.com/200?text=Galaxy+Buds2',
    prices: [
      { supplier_id: 'harvey_norman', price: 179.99 },
      { supplier_id: 'argos_ireland', price: 169.99 },
      { supplier_id: 'amazon', price: 159.99 }
    ]
  },
  {
    name: 'Sony WF-C700N Earbuds',
    category: 'Electronics',
    description: 'Compact wireless earbuds with ANC',
    image_url: 'https://via.placeholder.com/200?text=Sony+WF-C700N',
    prices: [
      { supplier_id: 'harvey_norman', price: 199.99 },
      { supplier_id: 'argos_ireland', price: 189.99 }
    ]
  },
  {
    name: 'Instant Pot Ultra',
    category: 'Home & Kitchen',
    description: 'Advanced multi-cooker with 10-in-1 functions',
    image_url: 'https://via.placeholder.com/200?text=Instant+Pot+Ultra',
    prices: [
      { supplier_id: 'argos_ireland', price: 199.99 },
      { supplier_id: 'dunnes', price: 189.99 },
      { supplier_id: 'amazon', price: 179.99 }
    ]
  },
  {
    name: 'KitchenAid Stand Mixer',
    category: 'Home & Kitchen',
    description: 'Professional stand mixer for baking',
    image_url: 'https://via.placeholder.com/200?text=KitchenAid+Mixer',
    prices: [
      { supplier_id: 'harvey_norman', price: 649.99 },
      { supplier_id: 'argos_ireland', price: 599.99 }
    ]
  },
  {
    name: 'Dyson V11 Vacuum',
    category: 'Home & Kitchen',
    description: 'Cordless vacuum with laser detection',
    image_url: 'https://via.placeholder.com/200?text=Dyson+V11',
    prices: [
      { supplier_id: 'harvey_norman', price: 699.99 },
      { supplier_id: 'argos_ireland', price: 679.99 },
      { supplier_id: 'amazon', price: 659.99 }
    ]
  },
  {
    name: 'LG 55-inch OLED TV',
    category: 'Electronics',
    description: '4K OLED smart television',
    image_url: 'https://via.placeholder.com/200?text=LG+OLED+55',
    prices: [
      { supplier_id: 'harvey_norman', price: 1299.99 },
      { supplier_id: 'argos_ireland', price: 1249.99 },
      { supplier_id: 'amazon', price: 1199.99 }
    ]
  },
  {
    name: 'Sony A80L OLED TV',
    category: 'Electronics',
    description: 'Premium 55-inch OLED television',
    image_url: 'https://via.placeholder.com/200?text=Sony+A80L+55',
    prices: [
      { supplier_id: 'harvey_norman', price: 1399.99 },
      { supplier_id: 'argos_ireland', price: 1349.99 }
    ]
  },
  {
    name: 'Nintendo Switch Sports Bundle',
    category: 'Electronics',
    description: 'Gaming console with Sports game',
    image_url: 'https://via.placeholder.com/200?text=Switch+Sports',
    prices: [
      { supplier_id: 'smyths', price: 399.99 },
      { supplier_id: 'argos_ireland', price: 389.99 },
      { supplier_id: 'jd_sports', price: 419.99 }
    ]
  },
  {
    name: 'LEGO Technic Lamborghini',
    category: 'Toys',
    description: 'Advanced LEGO Technic supercar set',
    image_url: 'https://via.placeholder.com/200?text=LEGO+Lamborghini',
    prices: [
      { supplier_id: 'smyths', price: 349.99 },
      { supplier_id: 'argos_ireland', price: 329.99 },
      { supplier_id: 'amazon', price: 299.99 }
    ]
  },
  {
    name: 'New Balance 990v6',
    category: 'Sports',
    description: 'Premium lifestyle running shoe',
    image_url: 'https://via.placeholder.com/200?text=NB+990v6',
    prices: [
      { supplier_id: 'jd_sports', price: 249.99 },
      { supplier_id: 'sports_direct', price: 199.99 },
      { supplier_id: 'dunnes', price: 229.99 }
    ]
  },
  {
    name: 'Saucony Ride 16',
    category: 'Sports',
    description: 'Responsive running shoe for daily training',
    image_url: 'https://via.placeholder.com/200?text=Saucony+Ride+16',
    prices: [
      { supplier_id: 'jd_sports', price: 149.99 },
      { supplier_id: 'sports_direct', price: 119.99 }
    ]
  },
  {
    name: 'Fitbit Versa 4',
    category: 'Electronics',
    description: 'Smartwatch with fitness tracking',
    image_url: 'https://via.placeholder.com/200?text=Fitbit+Versa+4',
    prices: [
      { supplier_id: 'harvey_norman', price: 229.99 },
      { supplier_id: 'argos_ireland', price: 219.99 },
      { supplier_id: 'dunnes', price: 249.99 }
    ]
  },
  {
    name: 'GoPro HERO12 Black',
    category: 'Electronics',
    description: 'Professional action camera',
    image_url: 'https://via.placeholder.com/200?text=GoPro+HERO12',
    prices: [
      { supplier_id: 'harvey_norman', price: 549.99 },
      { supplier_id: 'argos_ireland', price: 529.99 },
      { supplier_id: 'amazon', price: 499.99 }
    ]
  },
  {
    name: 'Philips Sonicare Electric Toothbrush',
    category: 'Health & Beauty',
    description: 'Smart electric toothbrush with app',
    image_url: 'https://via.placeholder.com/200?text=Sonicare',
    prices: [
      { supplier_id: 'dunnes', price: 179.99 },
      { supplier_id: 'penneys', price: 89.99 },
      { supplier_id: 'argos_ireland', price: 169.99 }
    ]
  },
  {
    name: 'Braun Series 9 Shaver',
    category: 'Health & Beauty',
    description: 'Premium electric shaving system',
    image_url: 'https://via.placeholder.com/200?text=Braun+Series+9',
    prices: [
      { supplier_id: 'dunnes', price: 349.99 },
      { supplier_id: 'argos_ireland', price: 329.99 },
      { supplier_id: 'amazon', price: 299.99 }
    ]
  },
  {
    name: 'Oral-B iO Electric Toothbrush',
    category: 'Health & Beauty',
    description: 'AI-powered smart toothbrush',
    image_url: 'https://via.placeholder.com/200?text=Oral-B+iO',
    prices: [
      { supplier_id: 'dunnes', price: 199.99 },
      { supplier_id: 'argos_ireland', price: 189.99 }
    ]
  },
  {
    name: 'Corsair K95 Mechanical Keyboard',
    category: 'Electronics',
    description: 'Premium RGB mechanical gaming keyboard',
    image_url: 'https://via.placeholder.com/200?text=Corsair+K95',
    prices: [
      { supplier_id: 'jd_sports', price: 199.99 },
      { supplier_id: 'amazon', price: 179.99 }
    ]
  },
  {
    name: 'Razer DeathAdder Pro',
    category: 'Electronics',
    description: 'Ergonomic gaming mouse',
    image_url: 'https://via.placeholder.com/200?text=Razer+DeathAdder',
    prices: [
      { supplier_id: 'jd_sports', price: 79.99 },
      { supplier_id: 'amazon', price: 69.99 }
    ]
  },
  {
    name: 'Sennheiser Momentum 4',
    category: 'Electronics',
    description: 'Premium wireless headphones with 60h battery',
    image_url: 'https://via.placeholder.com/200?text=Sennheiser+M4',
    prices: [
      { supplier_id: 'harvey_norman', price: 399.99 },
      { supplier_id: 'argos_ireland', price: 379.99 },
      { supplier_id: 'amazon', price: 359.99 }
    ]
  },
  {
    name: 'Beats Studio Pro',
    category: 'Electronics',
    description: 'Premium noise-canceling headphones',
    image_url: 'https://via.placeholder.com/200?text=Beats+Studio+Pro',
    prices: [
      { supplier_id: 'harvey_norman', price: 449.99 },
      { supplier_id: 'argos_ireland', price: 429.99 },
      { supplier_id: 'amazon', price: 399.99 }
    ]
  }
];

async function seedIrishProducts() {
  try {
    console.log('Starting to seed Irish products...\n');
    
    for (const product of irishProducts) {
      try {
        const productResponse = await axios.post(`${BASE_URL}/products`, {
          name: product.name,
          category: product.category,
          description: product.description,
          image_url: product.image_url
        });
        
        const productId = productResponse.data.id;
        console.log(`✓ Added: ${product.name}`);
        
        for (const priceData of product.prices) {
          await axios.post(`${BASE_URL}/product-prices`, {
            product_id: productId,
            supplier_id: priceData.supplier_id,
            price: priceData.price,
            currency: 'EUR'
          });
        }
        
        console.log(`  ├─ Prices from ${product.prices.length} suppliers`);
      } catch (error) {
        console.error(`✗ Error adding ${product.name}:`, error.message);
      }
    }
    
    console.log('\n✅ Irish products seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Total Products Added: ${irishProducts.length}`);
    console.log(`   New Irish Suppliers: JD Sports, Sports Direct, Penneys, Dunnes, Harvey Norman, Argos Ireland`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error in seeding process:', error.message);
    process.exit(1);
  }
}

seedIrishProducts();
