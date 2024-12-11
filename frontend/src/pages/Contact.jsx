import React, { useState, useEffect } from "react";
import chatbotIcon from "../assets/images/imageLogo.png"; // Adjust path as needed
import faqImage from "../assets/images/Travel.png"; // Add your FAQ image path here
import travelImg from "../assets/images/Travel.png";
import "../styles/contact.css";

const Contact = () => {
   const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false); // State to track script loading

   useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
          document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        }
      }, []);



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

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
    // Toggle theme (light/dark)
    const toggleTheme = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme); // Save theme to localStorage
        document.body.classList.toggle('dark-theme', !isDarkMode); // Apply dark-theme class
      };

  return (
    
    <div style={{ position: "relative", minHeight: "100vh", paddingBottom: "120px" }}>
        <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '20px',
          right: '30px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          zIndex: '1000',
          fontSize: '24px',
        }}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>

        {/* Contact Form */}
        <div
                className="visme_d"
                data-title="Contact_Form"
                data-url="8r1ddn0v-contact-form"
                data-domain="forms"
                data-full-page="false"
                data-min-height="500px"
                data-form-id="90015"
            ></div>


      {/* Support Page Content */}
      <div className="support-page">
        
        {/* Help Center FAQ Section */}
        <section className="faq-section">
          <h2>Frequent Asked Questions</h2>
          <div className="faq-item">
            <img src={faqImage} alt="FAQ" className="faq-image" />
            <div>
              <h4>Q: How can I book a guided tour?</h4>
              <div className="faq-answer">
                <p>A: You can book a guided tour through our website by selecting the "Book a Tour" section and choosing the tour type, date, and group size.</p>
              </div>
            </div>
          </div>
          <div className="faq-item">
            <img src={faqImage} alt="FAQ" className="faq-image" />
            <div>
              <h4>Q: What is included in the tour packages?</h4>
              <div className="faq-answer">
                <p>A: Our packages generally include transportation, accommodations, guided tours, and meals. You can check the details of each package on our website.</p>
              </div>
            </div>
          </div>
          <div className="faq-item">
            <img src={faqImage} alt="FAQ" className="faq-image" />
            <div>
              <h4>Q: How do I cancel or modify my booking?</h4>
              <div className="faq-answer">
                <p>A: You can cancel or modify your booking by visiting your account page or contacting our support team at support@traveltours.com.</p>
              </div>
            </div>
          </div>
          <div className="faq-item">
            <img src={faqImage} alt="FAQ" className="faq-image" />
            <div>
              <h4>Q: Can I get a refund if I cancel my tour?</h4>
              <div className="faq-answer">
                <p>A: Refunds are available if you cancel at least 48 hours before the start of the tour. Please refer to our cancellation policy for full details.</p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="travel-img">
          <img src={travelImg} alt="Travel" className="travel-img" />
        </div>
      </div>

      {/* Chatbot Button */}
      <button
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "30px",
          height: "100px",
          width: "100px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: "1000",
        }}
      >
        <img src={chatbotIcon} alt="Chatbot" style={{ width: "100px", height: "100px" }} />
      </button>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          <strong>Email:</strong> travelease48@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> +919999999999
        </p>
        <p>
          <strong>Address:</strong> Punjab, India
        </p>
      </section>
    </div>
  );
};

export default Contact;
