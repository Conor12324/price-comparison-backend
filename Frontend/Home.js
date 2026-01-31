import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Home({ setCurrentPage }) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSuppliers: 0,
    availableAdSpaces: 0
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, suppliersRes, adsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/products`),
        axios.get(`${API_BASE_URL}/api/suppliers`),
        axios.get(`${API_BASE_URL}/api/ad-spaces/available`)
      ]);

      setStats({
        totalProducts: productsRes.data.length,
        totalSuppliers: suppliersRes.data.length,
        availableAdSpaces: adsRes.data.length
      });
      setProducts(productsRes.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="home-page">
      <section style={{ marginBottom: '40px' }}>
        <h2>Welcome to Price Comparison Hub</h2>
        <p style={{ fontSize: '1.1em', color: '#666', lineHeight: '1.6' }}>
          Find the best deals on products from your favorite suppliers. Compare prices in EUR across 
          Amazon, Smyths, eBay, Decathlon, and more. Always get the best value for your money!
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#667eea', fontSize: '2em' }}>{stats.totalProducts}</h3>
          <p>Products Tracked</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#667eea', fontSize: '2em' }}>{stats.totalSuppliers}</h3>
          <p>Suppliers Compared</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#667eea', fontSize: '2em' }}>Save Money</h3>
          <p>Find the Lowest Prices</p>
        </div>
      </div>

      <section style={{ marginBottom: '40px' }}>
        <h3>Featured Products</h3>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
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
              </div>
            </div>
          ))}
        </div>
        <button 
          className="btn" 
          onClick={() => setCurrentPage('compare')}
          style={{ marginTop: '20px', fontSize: '1.1em', padding: '12px 30px' }}
        >
          Compare All Products
        </button>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>How It Works</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div className="card">
            <h4>1. Search Products</h4>
            <p>Find the product you're looking for using our search feature.</p>
          </div>
          <div className="card">
            <h4>2. Compare Prices</h4>
            <p>View prices from different suppliers side by side in EUR.</p>
          </div>
          <div className="card">
            <h4>3. Save Money</h4>
            <p>Click on the best price and purchase from your preferred supplier.</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f0f0f0', padding: '30px', borderRadius: '8px', marginBottom: '40px' }}>
        <h3>Advertise with Us</h3>
        <p>Reach thousands of customers looking for great deals. We offer affordable ad space for brands and sellers.</p>
        <button 
          className="btn btn-success"
          onClick={() => setCurrentPage('ads')}
          style={{ fontSize: '1em', padding: '10px 25px' }}
        >
          View Ad Opportunities
        </button>
      </section>

      <section>
        <h3>Our Suppliers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          {['Amazon', 'Smyths', 'eBay', 'Decathlon'].map((supplier) => (
            <div key={supplier} className="card" style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ fontSize: '1.3em' }}>🏪</p>
              <p style={{ fontWeight: 'bold' }}>{supplier}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
