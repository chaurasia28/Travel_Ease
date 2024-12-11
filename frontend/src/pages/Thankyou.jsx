import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/thank-you.css';
import './SubscriptionPage';

const Thankyou = () => {
  const [amount, setAmount] = useState(0); 
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleRazorpayPayment = () => {
    if (window.Razorpay) {
      const options = {
        key: 'rzp_test_GFDuCQAYS65RbS', 
        amount: amount * 100, 
        currency: 'INR',
        name: 'TravelEase',
        description: 'Tour Booking Payment',
        image: 'https://example.com/logo.png',
        handler: function (response) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
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

  // JavaScript function to handle subscription
const handleSubscribe = (event) => {
  event.preventDefault(); // Prevent default form submission

  // Perform subscription logic here (e.g., API call)
  
  // Assuming subscription is successful:
  setIsSubscribed(true); // Update state to reflect subscription status

  // Redirect to the subscription page
  window.location.href = './subscribe'; // Replace with your actual subscription page URL
}

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="pt-5 text-center">
              <div className="thank__you">
                <span>
                  <i className="ri-checkbox-circle-line"></i>
                </span>
                <h1 className="mb-3 fw-semibold">Thank You</h1>
                <h3 className="mb-4">Please Proceed..</h3>

                <input
                  className="input-margin"
                  type="number"
                  placeholder="Enter Amount in INR"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
               />
                
                <button
                  className="btn primary__btn w-25 "
                  onClick={handleRazorpayPayment}
                >
                  Pay Now
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Subscription Section */}
      <section className="subscription mt-5">
  <Container>
    <Row>
      <Col lg="12" className="text-center">
        <h2 className="mb-3">Subscribe to Our Newsletter</h2>
        <p className="mb-4">Stay updated with our latest offers and news.</p>
        {isSubscribed ? (
          <p className="text-success">Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubscribe}>
            <div className="mail">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn primary__btn w-25">Subscribe</button>
          </form>
        )}
        <p className="mt-4">
                Want to subscribe? <Link to="/subscribe">Click here</Link> to subscribe now!
              </p>
      </Col>
    </Row>
  </Container>
</section>


    </>
  );
};

export default Thankyou;