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
    name: "Liverpool Home Shirt 2025/26 Adult",
    imageUrl: "https://www.elverys.ie/cdn/shop/files/C1-1163827_636Wx636H.jpg?v=1754033152&width=1517",
    prices: [
      { supplier: "JD Sports", price: 100.00, currency: "EUR" },
      { supplier: "Elverys", price: 80.00, currency: "EUR" }
    ]
  },
  {
    id: 2,
    name: "O'Neills Size 5 Gaelic Football",
    imageUrl: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ8xMN-HV65TOcP4HY_BmS9C3QjCUfLxM3izQ_WI_ZwzMT6LxJ8QZRRETk1EMTxDXiaqb8y8SFoOV_I-I621KfcQaCtkTBClkJ5VCOCitUNYg-0Tu_sxtQLR2bdRW7c9_Zmi2Zfdfw&usqp=CAc",
    prices: [
      { supplier: "Lifestyle Sports", price: 20.00, currency: "EUR" },
      { supplier: "Elverys", price: 22.00, currency: "EUR" }
    ]
  },
  {
    id: 3,
    name: "Puma Orbita Premier League Ball 2025/26",
    imageUrl: "https://via.placeholder.com/150?text=LEGO+City",
    prices: [
      { supplier: "Elverys", price: 30.00, currency: "EUR" },
      { supplier: "Amazon", price: 15.76, currency: "EUR" }
    ]
  },
  {
    id: 4,
    name: "Manchester United Home Shirt 2025/26 Adult",
    imageUrl: "https://cdn.media.amplience.net/i/frasersdev/37782208_o?fmt=auto&upscale=false&w=1534&h=1534&sm=scaleFit&$h-ttl$",
    prices: [
      { supplier: "JD Sports", price: 100.00, currency: "EUR" },
      { supplier: "Amazon", price: 132.49, currency: "EUR" }
    ]
  },
  {
    id: 5,
    name: "Celtic Away Shirt 2025/26 Adult",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvXOZMeb16dRxwPnXS13yxq0abJQIhbLUQ7qWQP6u0g27gPboh2ZfbLAo&s",
    prices: [
      { supplier: "Adidas", price: 100.00, currency: "EUR" },
      { supplier: "JD Sports", price: 85.00, currency: "EUR" }
    ]
  },
  {
    id: 6,
    name: "Adidas Fold - Over Predator Boots",
    imageUrl: "https://cdn.media.amplience.net/i/frasersdev/08439703_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
    prices: [
      { supplier: "Sports Direct", price: 55.00, currency: "EUR" },
      { supplier: "JD Sports", price: 65.00, currency: "EUR" }
    ]
  },
  {
    id: 7,
    name: "Real Madrid Home Shirt 2025/26 Adult",
    imageUrl: "data:image/jpeg;base64,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",
    prices: [
      { supplier: "JD Sports", price: 150.00, currency: "EUR" },
      { supplier: "Elverys", price: 100.00, currency: "EUR" }
    ]
  },
  {
    id: 8,
    name: "Precison Fusion X Pro Lite Giga Goalkeeper Gloves",
    imageUrl: "https://www.elverys.ie/cdn/shop/files/C1-1158995-636Wx636H.jpg?v=1719412394&width=400",
    prices: [
      { supplier: "Elverys", price: 46.00, currency: "EUR" },
      { supplier: "O'Neills", price: 43.00, currency: "EUR" }
    ]
  },
  {
    id: 9,
    name: "Liverpool Away Shirt 2025/26 Adult Blue",
    imageUrl: "https://cdn.media.amplience.net/i/frasersdev/37876515_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
    prices: [
      { supplier: "Lifestyle Sports", price: 80.00, currency: "EUR" },
      { supplier: "JD Sports", price: 100.00, currency: "EUR" }
    ]
  },
  {
    id: 10,
    name: "Chelsea Home Shirt 2025/26 Adult",
    imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRtxjGUsKKbJ1qu4EohedNJycDdvAjE9PtcKCMvaoyIOUNvBo1cnrN6in3spCcQAh5YvEtIwwKyUYPLY_aIQligMg9MTjlJNSa-ZELPqLg6hgB_eVKk_rLU4Y1P56ErEzcglO4-kU_d&usqp=CAc",
    prices: [
      { supplier: "JD Sports", price: 100.00, currency: "EUR" },
      { supplier: "Lifestyle Sports", price: 75.00, currency: "EUR" }
    ]
  },
  {
    id: 11,
    name: "Manchester City Home Shirt 2025/26 Adult",
    imageUrl: "data:image/jpeg;base64,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",
    prices: [
      { supplier: "Lifestyle Sports", price: 75.00, currency: "EUR" },
      { supplier: "Sports Direct", price: 100.00, currency: "EUR" }
    ]
  },
  {
    id: 12,
    name: "Arsenal Home Shirt 2025/26 Adult",
    imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQdfSYbGxnXhiqhMuqRUVqI_K_cTZ5LBPV5AQFBPlts9LQg38O9Rssq9Uo-t6P-IC8WBDT4b5MUAyHpBoJeAvfjYMVLkR7Yzb6zexSUdlBg97qJGaJa0886a7kKdXAzKAzQ2QQkcA&usqp=CAc",
    prices: [
      { supplier: "Lifestyle Sports", price: 80.00, currency: "EUR" },
      { supplier: "JD Sports", price: 100.00, currency: "EUR" }
    ]
  },
  {
    id: 13,
    name: "Tottenham Hotspur Home Shirt 2025/26 Adult",
    imageUrl: "https://via.placeholder.com/150?text=Surf+Shorts",
    prices: [
      { supplier: "Lifestle Sport", price: 75.00, currency: "EUR" },
      { supplier: "Sports Direct", price: 100.00, currency: "EUR" }
    ]
  },
  {
    id: 14,
    name: "Mycro White Hurling Helmet",
    imageUrl: "https://cdn.media.amplience.net/i/frasersdev/89507201_o?fmt=auto&upscale=false&w=345&h=345&sm=c&$h-ttl$",
    prices: [
      { supplier: "Sports Direct", price: 85.00, currency: "EUR" },
      { supplier: "Elverys", price: 95.00, currency: "EUR" }
    ]
  },
  {
    id: 15,
    name: "UCL Football League Stage Ball 2025/26",
    imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSm67pKlM1Aq6wvQuLeHzk8gbExJxvHQbXZzUGqZC5vI900sUHS3W4TwMxSV3wI5II8T5mKVI-g_DmbLRu5VfSN1OIlumVa-ruIL8lz4Kh1LofdboWBvL9cb6BzdhAHyzqReKfAPA0&usqp=CAc",
    prices: [
      { supplier: "Sports Direct", price: 40.00, currency: "EUR" },
      { supplier: "JD Sports", price: 30.00, currency: "EUR" }
    ]
  },
  {
    id: 16, 
    name: "Playstation 5",
    imageUrl:"data:image/jpeg;base64,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",
    prices: [
      { supplier: "CEX", price: 470.00, currency: "EUR" },
      { supplier: "Game Stop", price: 389.99, currency: "EUR" }
    ]
  },
  {
    id: 17, 
    name: "EA FC 26",
    imageUrl:""
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
