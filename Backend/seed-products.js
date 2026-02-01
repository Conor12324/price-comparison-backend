const axios = require('axios');

// The base URL for your deployed backend
const BASE_URL = "https://price-comparison-backend-hho4.onrender.com";

// Expanded list of products with prices from different retailers
const products = [
  { name: "Lego Star Wars Millenium Falcon", category: "Toys", description: "A fun Lego set for Star Wars fans.", image_url: "https://m.media-amazon.com/images/I/81A+zjlwH5L._AC_SL1500_.jpg" },
  { name: "Nike Air Max 90", category: "Footwear", description: "Comfortable and stylish sneakers.", image_url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ocikj7w6kcdzlwnk7uwm/air-max-90-shoes-nG5P1C.jpg" },
  { name: "Sony WH-1000XM4 Headphones", category: "Electronics", description: "Noise-cancelling over-ear headphones.", image_url: "https://www.sony.ie/image/047149221c03cc24cd38512c8c57757e?fmt=jpeg&bgcolor=ffffff&bgc=ffffff" },
  { name: "PlayStation 5 Console", category: "Gaming", description: "The latest PlayStation console for gamers.", image_url: "https://www.playstation.com/etc.clientlibs/ps4/base/lib/img/ps5/ps5-console-og.jpg" },
  { name: "Adidas Originals Trefoil Hoodie", category: "Clothing", description: "A comfortable hoodie for casual wear.", image_url: "https://www.adidas.ie/media/1315/sku_02.png" },
  { name: "Apple iPhone 13", category: "Electronics", description: "The latest iPhone with A15 chip.", image_url: "https://www.apple.com/v/iphone-13/d/images/overview/hero/iphone_13__fw8y7f54jpmq_large_2x.jpg" },
  { name: "Smyths Toys Playdough", category: "Toys", description: "Fun playdough for kids to create and mould.", image_url: "https://www.smythstoys.com/ie/en-ie/lego-2/lego-sets/lego-creator-3-in-1-rocket-tractor-31113/p/166775" },
  { name: "JD Sports Adidas T-Shirt", category: "Clothing", description: "Classic Adidas t-shirt from JD Sports.", image_url: "https://images.jdsports.ie/media/catalog/product/9/2/92-22556-01_1_600x600.jpg" },
  { name: "Amazon Echo Dot", category: "Electronics", description: "Smart speaker with Alexa.", image_url: "https://images-na.ssl-images-amazon.com/images/I/61ftODI5r5L._AC_SX679_.jpg" },
  { name: "O'Neill Surfboard", category: "Sports", description: "High-quality surfboard from O'Neill.", image_url: "https://www.oneill.com/wp-content/uploads/2020/08/61tq9wRkH7L._AC_SL1500_.jpg" },
  { name: "Penneys Men's Jeans", category: "Clothing", description: "Stylish jeans for men at an affordable price.", image_url: "https://www.penneys.com/media/images/jeans-black.jpg" },
  { name: "Xiaomi Mi Smart Band 6", category: "Electronics", description: "Smart fitness band with heart rate monitor.", image_url: "https://www.mi.com/global/img/gallery/miband6/feature_3.jpg" },
  { name: "Samsung Galaxy S21", category: "Electronics", description: "Flagship smartphone with 5G capabilities.", image_url: "https://www.samsung.com/ie/smartphones/galaxy-s21-5g/" },
  { name: "Smyths Toys Nerf Gun", category: "Toys", description: "Nerf blaster for kids of all ages.", image_url: "https://www.smythstoys.com/ie/en-ie/toys/action-figures-and-playsets/nerf/n-strike-elite-disruptor/p/164327" },
  { name: "Nike Training Tights", category: "Clothing", description: "Stretchy and durable workout tights.", image_url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eeozhpm5tnmoycoflolr/tech-fleece-training-tights-W1tngH.jpg" },
  { name: "HP Envy Laptop", category: "Electronics", description: "High-performance laptop with Intel Core i7.", image_url: "https://www.hp.com/content/dam/hp/shared/images/environments/envy-laptops.jpg" },
  { name: "Mizuno Wave Rider 25", category: "Footwear", description: "Running shoes with enhanced cushioning.", image_url: "https://www.mizunousa.com/media/2421/1012.jpg" },
  { name: "Fisher-Price Dinosaur", category: "Toys", description: "Interactive dinosaur for young kids.", image_url: "https://media.fisher-price.com/fpimages/fisher-price.jpg" },
  { name: "JD Sports Nike Air Max 270", category: "Footwear", description: "Stylish air-cushioned sneakers.", image_url: "https://images.jdsports.ie/media/catalog/product/9/2/92-22474-01_1_600x600.jpg" },
  { name: "Nvidia GeForce RTX 3080", category: "Electronics", description: "High-performance graphics card for gamers.", image_url: "https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-rtx-30-series/geforce-rtx-3080-og.jpg" },
  { name: "Adidas UltraBoost 22", category: "Footwear", description: "Comfortable running shoes with boost cushioning.", image_url: "https://www.adidas.ie/media/1315/sku_02.png" },
  { name: "TCL 55-inch 4K TV", category: "Electronics", description: "Affordable 4K smart TV with HDR.", image_url: "https://www.tcl.com/ie/en/images/tvs/55P8TV.jpg" },
  { name: "Bose SoundLink Revolve", category: "Electronics", description: "Portable Bluetooth speaker with 360° sound.", image_url: "https://www.bose.ie/en_ie/products/speakers/portable_speakers/soundlink_revolve_speaker/soundlink_revolve_speaker.jpg" },
  { name: "Puma Clyde Court", category: "Footwear", description: "Stylish basketball sneakers.", image_url: "https://media.puma.com/footwear/clyde-court.jpg" },
  { name: "GoPro HERO9 Black", category: "Electronics", description: "Action camera with 5K video recording.", image_url: "https://www.gopro.com/content/dam/gopro/pdp/hero9-black-01.jpg" },
  { name: "Samsung Galaxy Watch 4", category: "Electronics", description: "Smartwatch with health tracking.", image_url: "https://www.samsung.com/ie/smartwatches/galaxy-watch4/" },
  { name: "Dunnes Stores Bedding Set", category: "Home", description: "Soft and comfortable bedding set.", image_url: "https://www.dunnesstores.com/media/images/bedding.jpg" },
  { name: "Reebok Classic Leather", category: "Footwear", description: "Classic and comfortable leather sneakers.", image_url: "https://www.reebok.com/ie/en/classic-leather-sneakers" },
  { name: "Huawei Matebook 14", category: "Electronics", description: "Lightweight laptop with Intel i7 processor.", image_url: "https://consumer.huawei.com/ie/laptops/matebook-14/" },
  { name: "Nikon D3500 DSLR Camera", category: "Electronics", description: "Entry-level DSLR with 24.2 MP.", image_url: "https://www.nikon.ie/en_GB/product/d3500" },
  { name: "Dunnes Stores Coffee Maker", category: "Home", description: "Simple coffee maker for everyday use.", image_url: "https://www.dunnesstores.com/media/images/coffee-maker.jpg" },
  { name: "Under Armour HeatGear Shorts", category: "Clothing", description: "Compression shorts for athletic performance.", image_url: "https://www.underarmour.ie/en-ie/men/shorts" },
  // Add more products (continue the pattern)...
];

async function seedProducts() {
  try {
    console.log("Starting to seed products...");

    // Loop through the product data and create POST requests
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      // POST request to create a new product
      const response = await axios.post(`${BASE_URL}/products`, product);
      console.log(`Product ${product.name} added with ID: ${response.data.id}`);

      // Seed product prices for each product (simulating multiple suppliers)
      const prices = [
        { product_id: response.data.id, supplier_id: "Smyths", price: 79.99, currency: "EUR" },
        { product_id: response.data.id, supplier_id: "Amazon", price: 84.99, currency: "EUR" },
        { product_id: response.data.id, supplier_id: "JD Sports", price: 89.99, currency: "EUR" },
        { product_id: response.data.id, supplier_id: "Penney's", price: 74.99, currency: "EUR" },
        { product_id: response.data.id, supplier_id: "O'Neill's", price: 95.99, currency: "EUR" },
        // Add more suppliers and prices as needed
      ];

      // Loop through prices and add to backend
      for (let j = 0; j < prices.length; j++) {
        const price = prices[j];
        await axios.post(`${BASE_URL}/product-prices`, price);
        console.log(`Price added for ${product.name} from ${price.supplier_id}: €${price.price}`);
      }
    }

    console.log("All products seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  }
}

// Run the seeding function
seedProducts();
