import React, { useState } from "react";
import "../styles/SupportPage.css";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="support-page">
      <h1>Travel and Tours Support</h1>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4>Q: How do I book a tour?</h4>
          <p>A: You can book a tour through our website by navigating to the "Tours" section.</p>
        </div>
        <div className="faq-item">
          <h4>Q: What is your cancellation policy?</h4>
          <p>A: Cancellations made 48 hours before the tour start date will receive a full refund.</p>
        </div>
        <div className="faq-item">
          <h4>Q: Can I customize my travel itinerary?</h4>
          <p>A: Yes, we offer customizable travel packages to suit your needs. Contact us for more details.</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          <strong>Email:</strong> support@traveltours.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p>
          <strong>Address:</strong> 123 Travel Lane, Wanderlust City, WL 56789
        </p>
      </section>

      {/* Inquiry Form */}
      <section className="form-section">
        <h2>Send Us a Message</h2>
        {submitted && <p className="success-message">Thank you for your message! We will get back to you shortly.</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default SupportPage;
