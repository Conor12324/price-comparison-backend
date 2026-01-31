// script.js

// Function to fetch products from your backend
async function fetchProducts() {
  try {
    const response = await fetch('https://price-comparison-backend-hho4.onrender.com/products');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Function to display products in the HTML
function displayProducts(products) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = ''; // Clear previous content

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: €${product.price.toFixed(2)}</p>
    `;

    productsContainer.appendChild(productDiv);
  });
}

// Call the fetch function on page load
window.addEventListener('DOMContentLoaded', fetchProducts);
