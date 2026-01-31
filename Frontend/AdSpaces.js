import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AdSpaces() {
  const [adSpaces, setAdSpaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookedAds, setBookedAds] = useState({});

  useEffect(() => {
    fetchAdSpaces();
  }, []);

  const fetchAdSpaces = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ad-spaces`);
      setAdSpaces(response.data);
    } catch (error) {
      console.error('Error fetching ad spaces:', error);
      alert('Error loading ad spaces. Make sure the backend server is running.');
    }
    setLoading(false);
  };

  const handleBookAd = async (adId, adName) => {
    const advertiserName = prompt(`Enter your company/brand name to book "${adName}":`);
    if (advertiserName) {
      try {
        await axios.post(`${API_BASE_URL}/api/ad-spaces/${adId}/book`, {
          advertiser_name: advertiserName
        });
        setBookedAds({
          ...bookedAds,
          [adId]: advertiserName
        });
        fetchAdSpaces(); // Refresh the list
        alert('Ad space booked successfully! We will contact you shortly.');
      } catch (error) {
        console.error('Error booking ad space:', error);
        alert('Error booking ad space. Please try again.');
      }
    }
  };

  return (
    <div className="ad-spaces-page">
      <h2>📢 Advertise with Us</h2>
      
      <div className="card" style={{ marginBottom: '30px', backgroundColor: '#f0f9ff' }}>
        <h3 style={{ color: '#0066cc' }}>Premium Advertising Opportunities</h3>
        <p style={{ lineHeight: '1.6' }}>
          Reach thousands of savvy shoppers looking for the best deals. Our price comparison platform attracts 
          customers actively searching for products across multiple categories. Book your ad space today and 
          increase your brand visibility!
        </p>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✓ Targeted reach to deal-seeking customers</li>
          <li>✓ Multiple placement options</li>
          <li>✓ Flexible monthly billing</li>
          <li>✓ Professional ad placement</li>
          <li>✓ Analytics and reporting available</li>
        </ul>
      </div>

      {loading ? (
        <p>Loading ad spaces...</p>
      ) : (
        <div className="ad-space-grid">
          {adSpaces.map((ad) => (
            <div 
              key={ad.id} 
              className={`ad-item ${ad.is_available ? 'available' : ''}`}
            >
              <h4 className="ad-position">{ad.name}</h4>
              <p className="ad-description">{ad.description}</p>
              
              <div style={{ marginBottom: '15px' }}>
                <span 
                  className={`ad-status ${ad.is_available ? 'available' : 'unavailable'}`}
                >
                  {ad.is_available ? '✓ AVAILABLE' : '✗ BOOKED'}
                </span>
              </div>

              <p className="ad-price">€{ad.price_monthly}/month</p>

              {ad.is_available ? (
                <button 
                  className="btn btn-success"
                  onClick={() => handleBookAd(ad.id, ad.name)}
                  style={{ width: '100%' }}
                >
                  Book This Space
                </button>
              ) : (
                <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', textAlign: 'center', color: '#666' }}>
                  <p style={{ margin: 0 }}>Currently booked by:<br /><strong>{ad.current_advertiser}</strong></p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ marginTop: '40px', backgroundColor: '#fff3cd' }}>
        <h3>📧 Contact Us for Custom Packages</h3>
        <p>Looking for larger ad placements or custom advertising solutions?</p>
        <p><strong>Email:</strong> ads@pricecomparison.eu</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>We offer volume discounts and custom packages for long-term commitments.</p>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
        <h4>Why Advertise on Price Comparison Hub?</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '15px' }}>
          <div>
            <strong>High Intent Audience</strong>
            <p>Users visiting our site are actively looking for products and deals.</p>
          </div>
          <div>
            <strong>Quality Traffic</strong>
            <p>Organic users interested in comparing prices and saving money.</p>
          </div>
          <div>
            <strong>Multiple Formats</strong>
            <p>Banner ads, sidebar placements, and footer advertising options.</p>
          </div>
          <div>
            <strong>Affordable Rates</strong>
            <p>Competitive pricing with flexible monthly payment options.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdSpaces;
