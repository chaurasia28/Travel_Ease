import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SubscriptionPage.css'; 
import logos from '../assets/images/logo.png'; 
import { AuthContext } from './../context/AuthContext'; 

const SubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [membershipType, setMembershipType] = useState('regular'); 
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false); 
  const [amount, setAmount] = useState(0); 
  const [showGratitude, setShowGratitude] = useState(false); 

  const membershipAmounts = {
    regular: 1000, 
    premium: 2000   
  };

  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script loaded');
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleSubscribe = (event) => {
    event.preventDefault(); 

    if (email !== user?.email) {
      alert('The email entered does not match your login email. Please log in first.');
      navigate('/login'); 
      return;
    }

    calculateDiscount();

    console.log(`Subscribing email: ${email}`);
    
    setIsSubscribed(true); 
    setShowModal(true); 
  };

  const calculateDiscount = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); 

    let weekendDiscount = 0;
    if (dayOfWeek === 0 || dayOfWeek === 6) { 
      weekendDiscount = 10; 
    }

    let membershipDiscount = membershipType === 'premium' ? 10 : 0; 

    setDiscount(weekendDiscount + membershipDiscount);
  };

  const calculateTotalAmount = () => {
    const baseAmount = membershipAmounts[membershipType];
    const totalDiscount = discount;
    
    return baseAmount - (baseAmount * totalDiscount / 100);
  };

  const handleRazorpayPayment = () => {
    const totalAmount = calculateTotalAmount();

    if (window.Razorpay) {
      const options = {
        key: 'rzp_test_GFDuCQAYS65RbS', 
        amount: totalAmount * 100, 
        currency: 'INR',
        name: 'TravelEase',
        description: 'Tour Booking Payment',
        image: 'https://example.com/logo.png', 
        handler: function (response) {
          setShowGratitude(true); 
          createFallingStars(); 
        },
        prefill: {
          name: 'Customer Name', 
          email: email, 
          contact: '1234567890', 
        },
        notes: {
          address: 'Customer Address',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      alert('Razorpay script not loaded');
    }
  };

  const createFallingStars = () => {
    const container = document.createElement('div');
    container.className = 'falling-stars-container';

    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = 'falling-star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`; 
      container.appendChild(star);
    }

    document.body.appendChild(container);

    setTimeout(() => {
      document.body.removeChild(container);
    }, 5000);
  };

  const handleCloseGratitudePopup = () => {
    setShowGratitude(false); 
    window.location.reload();
  };

  return (
    <section className="subscription-page">
      <Container>
        <Row className="text-center">
          <Col lg="12">
            <img src={logos} alt="Logo" className="logo mb-4" />
            <h2 className="mb-3">"Travel Easier, Travel Better: Join the Travel-Ease Family!"</h2>
            <p className="mb-4">Stay updated with our latest offers and news.</p>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="text-center">
            {isSubscribed ? (
              <div className="thank-you-message">
                <p className="text-success">Thank you for subscribing!</p>
                <p>Discount unlocked: {discount}%</p>
                <p>Premium Charges: ₹{calculateTotalAmount().toFixed(2)}</p>
                <Button onClick={handleRazorpayPayment} className="btn btn-success">
                  Pay Now
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="subscription-form">
                <div className="mail mb-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>

                <div className="membership mb-3">
                  <label htmlFor="membership">Select Membership Type:</label>
                  <select
                    id="membership"
                    value={membershipType}
                    onChange={(e) => setMembershipType(e.target.value)}
                    className="form-select"
                  >
                    <option value="regular">Regular - ₹{membershipAmounts.regular}</option>
                    <option value="premium">Premium - ₹{membershipAmounts.premium}</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-25">Subscribe</button>
              </form>
            )}
          </Col>
        </Row>
      </Container>

      {showGratitude && (
        <div className="gratitude-popup">
          <div className="gratitude-content">
            <h2>Thank You for Your Payment!</h2>
            <div className="stars">
              <span role="img" aria-label="star">🌟</span>
              <span role="img" aria-label="star">🌟</span>
              <span role="img" aria-label="star">🌟</span>
              <span role="img" aria-label="star">🌟</span>
              <span role="img" aria-label="star">🌟</span>
            </div>
            <p>Your transaction was successful, and we appreciate your support!</p>
            <Button onClick={handleCloseGratitudePopup} className="btn btn-primary">Close</Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SubscriptionPage;
