import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function PriceComparison() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error loading products. Make sure the backend server is running on ' + API_BASE_URL);
    }
    setLoading(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
        )
      );
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div className="price-comparison-page">
      <h2>🔍 Compare Product Prices</h2>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="btn" onClick={fetchProducts}>Refresh</button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <div className="card">
          <p>No products found. Try searching with different keywords or add products first.</p>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => fetchProductDetails(product.id)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={product.image_url || 'https://via.placeholder.com/300x200?text=Product'} 
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  {product.category && (
                    <p className="product-category">{product.category}</p>
                  )}
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                  <p style={{ color: '#667eea', fontWeight: 'bold', cursor: 'pointer' }}>
                    Click to see all prices →
                  </p>
                </div>
              </div>
            ))}
          </div>

          {selectedProduct && (
            <div className="card" style={{ marginTop: '30px', borderLeft: '5px solid #667eea' }}>
              <h3>{selectedProduct.name}</h3>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              
              <h4 style={{ marginTop: '20px', marginBottom: '15px' }}>Prices from Different Suppliers:</h4>
              
              {selectedProduct.prices && selectedProduct.prices.length > 0 ? (
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Supplier</th>
                      <th>Price (€)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProduct.prices
                      .sort((a, b) => a.price - b.price)
                      .map((price, index) => (
                        <tr key={price.id} style={{ backgroundColor: index === 0 ? '#e8f5e9' : 'transparent' }}>
                          <td>
                            <strong>{price.supplier_name}</strong>
                          </td>
                          <td>
                            <span className={index === 0 ? 'best-price' : ''}>
                              €{price.price.toFixed(2)}
                            </span>
                          </td>
                          <td>
                            {price.product_url ? (
                              <a href={price.product_url} target="_blank" rel="noopener noreferrer" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                View on {price.supplier_name}
                              </a>
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No prices available for this product yet.</p>
              )}
              
              <button className="btn btn-secondary" onClick={() => setSelectedProduct(null)} style={{ marginTop: '15px' }}>
                Close
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PriceComparison;
