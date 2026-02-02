const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*
  PRODUCT STRUCTURE:
  - id
  - name
  - category
  - imageUrl
  - offers[] (price comparison)
*/

const products = [
  {
    id: 1,
    name: "Nike Air Force 1",
    category: "Footwear",
    imageUrl: "https://via.placeholder.com/200?text=Nike+Air+Force+1",
    offers: [
      { retailer: "JD Sports", price: 109.99, currency: "EUR" },
      { retailer: "Lifestyle Sports", price: 114.99, currency: "EUR" },
      { retailer: "Sports Direct", price: 99.99, currency: "EUR" }
    ]
  },
  {
    id: 2,
    name: "Adidas Ultraboost 23",
    category: "Footwear",
    imageUrl: "https://via.placeholder.com/200?text=Adidas+Ultraboost",
    offers: [
      { retailer: "Elverys", price: 189.99, currency: "EUR" },
      { retailer: "JD Sports", price: 199.99, currency: "EUR" },
      { retailer: "Amazon", price: 179.99, currency: "EUR" }
    ]
  },
  {
    id: 3,
    name: "New Balance 550",
    category: "Footwear",
    imageUrl: "https://via.placeholder.com/200?text=NB+550",
    offers: [
      { retailer: "Lifestyle Sports", price: 139.99, currency: "EUR" },
      { retailer: "JD Sports", price: 144.99, currency: "EUR" }
    ]
  },

  // ---------- ELECTRONICS ----------
  {
    id: 4,
    name: "Apple AirPods Pro (2nd Gen)",
    category: "Electronics",
    imageUrl: "https://via.placeholder.com/200?text=AirPods+Pro",
    offers: [
      { retailer: "Amazon", price: 249.99, currency: "EUR" },
      { retailer: "Harvey Norman", price: 259.99, currency: "EUR" },
      { retailer: "Currys", price: 254.99, currency: "EUR" }
    ]
  },
  {
    id: 5,
    name: "Samsung Galaxy Watch 6",
    category: "Electronics",
    imageUrl: "https://via.placeholder.com/200?text=Galaxy+Watch+6",
    offers: [
      { retailer: "Amazon", price: 329.99, currency: "EUR" },
      { retailer: "Argos", price: 339.99, currency: "EUR" }
    ]
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    category: "Electronics",
    imageUrl: "https://via.placeholder.com/200?text=Sony+XM5",
    offers: [
      { retailer: "Amazon", price: 379.99, currency: "EUR" },
      { retailer: "Harvey Norman", price: 399.99, currency: "EUR" }
    ]
  },

  // ---------- TOYS ----------
  {
    id: 7,
    name: "LEGO Star Wars Millennium Falcon",
    category: "Toys",
    imageUrl: "https://via.placeholder.com/200?text=LEGO+Falcon",
    offers: [
      { retailer: "Smyths", price: 159.99, currency: "EUR" },
      { retailer: "Amazon", price: 149.99, currency: "EUR" }
    ]
  },
  {
    id: 8,
    name: "LEGO Harry Potter Hogwarts Castle",
    category: "Toys",
    imageUrl: "https://via.placeholder.com/200?text=LEGO+Hogwarts",
    offers: [
      { retailer: "Smyths", price: 499.99, currency: "EUR" },
      { retailer: "Amazon", price: 489.99, currency: "EUR" }
    ]
  },
  {
    id: 9,
    name: "Barbie Dreamhouse",
    category: "Toys",
    imageUrl: "https://via.placeholder.com/200?text=Barbie+Dreamhouse",
    offers: [
      { retailer: "Smyths", price: 179.99, currency: "EUR" },
      { retailer: "Amazon", price: 169.99, currency: "EUR" }
    ]
  },

  // ---------- SPORTS ----------
  {
    id: 10,
    name: "O’Neills Ireland Home Jersey",
    category: "Sportswear",
    imageUrl: "https://via.placeholder.com/200?text=Ireland+Jersey",
    offers: [
      { retailer: "O’Neills", price: 75.00, currency: "EUR" },
      { retailer: "Elverys", price: 79.99, currency: "EUR" }
    ]
  },
  {
    id: 11,
    name: "Canterbury Rugby Boots",
    category: "Sportswear",
    imageUrl: "https://via.placeholder.com/200?text=Rugby+Boots",
    offers: [
      { retailer: "Elverys", price: 119.99, currency: "EUR" },
      { retailer: "Sports Direct", price: 109.99, currency: "EUR" }
    ]
  },

  // ---------- HOME ----------
  {
    id: 12,
    name: "Dyson V15 Detect",
    category: "Home",
    imageUrl: "https://via.placeholder.com/200?text=Dyson+V15",
    offers: [
      { retailer: "Harvey Norman", price: 749.99, currency: "EUR" },
      { retailer: "Amazon", price: 729.99, currency: "EUR" }
    ]
  },
  {
    id: 13,
    name: "Nespresso Vertuo Next",
    category: "Home",
    imageUrl: "https://via.placeholder.com/200?text=Nespresso",
    offers: [
      { retailer: "Currys", price: 139.99, currency: "EUR" },
      { retailer: "Amazon", price: 129.99, currency: "EUR" }
    ]
  },

  // ---------- GAMING ----------
  {
    id: 14,
    name: "PlayStation 5",
    category: "Gaming",
    imageUrl: "https://via.placeholder.com/200?text=PS5",
    offers: [
      { retailer: "Smyths", price: 549.99, currency: "EUR" },
      { retailer: "Amazon", price: 539.99, currency: "EUR" }
    ]
  },
  {
    id: 15,
    name: "Nintendo Switch OLED",
    category: "Gaming",
    imageUrl: "https://via.placeholder.com/200?text=Switch+OLED",
    offers: [
      { retailer: "Smyths", price: 349.99, currency: "EUR" },
      { retailer: "Amazon", price: 339.99, currency: "EUR" }
    ]
  }
];

// API ROUTE
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/", (req, res) => {
  res.send("Price Comparison Backend Running ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
