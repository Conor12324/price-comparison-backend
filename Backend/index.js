// index.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Hard-coded products with multiple suppliers and images
const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    imageUrl: "https://via.placeholder.com/150?text=Nike+Air+Max+270",
    prices: [
      { supplier: "JD Sports", price: 120.99, currency: "EUR" },
      { supplier: "Sports Direct", price: 115.50, currency: "EUR" }
    ]
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    imageUrl: "https://via.placeholder.com/150?text=Adidas+Ultraboost",
    prices: [
      { supplier: "Lifestyle Sports", price: 140.00, currency: "EUR" },
      { supplier: "Elverys", price: 138.50, currency: "EUR" }
    ]
  },
  {
    id: 3,
    name: "Smyths LEGO City Set",
    imageUrl: "https://via.placeholder.com/150?text=LEGO+City",
    prices: [
      { supplier: "Smyths", price: 39.99, currency: "EUR" },
      { supplier: "Amazon", price: 42.50, currency: "EUR" }
    ]
  },
  {
    id: 4,
    name: "O'Neill Rash Vest",
    imageUrl: "https://via.placeholder.com/150?text=O'Neill+Rash+Vest",
    prices: [
      { supplier: "O Neill's", price: 34.99, currency: "EUR" },
      { supplier: "Elverys", price: 32.50, currency: "EUR" }
    ]
  },
  {
    id: 5,
    name: "Penney's Women's Jacket",
    imageUrl: "https://via.placeholder.com/150?text=Penney's+Jacket",
    prices: [
      { supplier: "Penney's", price: 49.99, currency: "EUR" },
      { supplier: "Dunnes", price: 52.00, currency: "EUR" }
    ]
  },
  {
    id: 6,
    name: "Amazon Echo Dot",
    imageUrl: "https://via.placeholder.com/150?text=Echo+Dot",
    prices: [
      { supplier: "Amazon", price: 59.99, currency: "EUR" },
      { supplier: "Ebay", price: 62.50, currency: "EUR" }
    ]
  },
  {
    id: 7,
    name: "Thinking Toys Puzzle",
    imageUrl: "https://via.placeholder.com/150?text=Thinking+Toys+Puzzle",
    prices: [
      { supplier: "Thinking Toys", price: 19.99, currency: "EUR" },
      { supplier: "Amazon", price: 22.50, currency: "EUR" }
    ]
  },
  {
    id: 8,
    name: "Elverys Football",
    imageUrl: "https://via.placeholder.com/150?text=Elverys+Football",
    prices: [
      { supplier: "Elverys", price: 24.99, currency: "EUR" },
      { supplier: "Sports Direct", price: 22.50, currency: "EUR" }
    ]
  },
  {
    id: 9,
    name: "Lifestyle Sports Running Shoes",
    imageUrl: "https://via.placeholder.com/150?text=Running+Shoes",
    prices: [
      { supplier: "Lifestyle Sports", price: 89.99, currency: "EUR" },
      { supplier: "JD Sports", price: 92.50, currency: "EUR" }
    ]
  },
  {
    id: 10,
    name: "Dunnes Home Bedding Set",
    imageUrl: "https://via.placeholder.com/150?text=Bedding+Set",
    prices: [
      { supplier: "Dunnes", price: 59.99, currency: "EUR" },
      { supplier: "Penney's", price: 62.50, currency: "EUR" }
    ]
  },
  {
    id: 11,
    name: "Amazon Kindle Paperwhite",
    imageUrl: "https://via.placeholder.com/150?text=Kindle+Paperwhite",
    prices: [
      { supplier: "Amazon", price: 119.99, currency: "EUR" },
      { supplier: "Ebay", price: 125.00, currency: "EUR" }
    ]
  },
  {
    id: 12,
    name: "Smyths Disney Puzzle",
    imageUrl: "https://via.placeholder.com/150?text=Disney+Puzzle",
    prices: [
      { supplier: "Smyths", price: 15.99, currency: "EUR" },
      { supplier: "Thinking Toys", price: 17.50, currency: "EUR" }
    ]
  },
  {
    id: 13,
    name: "O'Neill Surf Shorts",
    imageUrl: "https://via.placeholder.com/150?text=Surf+Shorts",
    prices: [
      { supplier: "O Neill's", price: 29.99, currency: "EUR" },
      { supplier: "Elverys", price: 32.50, currency: "EUR" }
    ]
  },
  {
    id: 14,
    name: "JD Sports Hoodie",
    imageUrl: "https://via.placeholder.com/150?text=JD+Hoodie",
    prices: [
      { supplier: "JD Sports", price: 49.99, currency: "EUR" },
      { supplier: "Lifestyle Sports", price: 52.50, currency: "EUR" }
    ]
  },
  {
    id: 15,
    name: "Sports Direct Soccer Ball",
    imageUrl: "https://via.placeholder.com/150?text=Soccer+Ball",
    prices: [
      { supplier: "Sports Direct", price: 21.99, currency: "EUR" },
      { supplier: "Elverys", price: 23.50, currency: "EUR" }
    ]
  }
];

// GET /products - return all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
