const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Products route (example)
app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Product A", price: 19.99, currency: "EUR" },
    { id: 2, name: "Product B", price: 24.99, currency: "EUR" }
  ];
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

