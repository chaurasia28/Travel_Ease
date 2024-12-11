import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';
import "../styles/tour.css";
import tourData from '../assets/data/tours';
import TourCard from './../shared/TourCard';
import SearchBar from './../shared/SearchBar';
import Newsletter from './../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';

import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import chatbotIcon from '../assets/images/imageLogo.png'; // Path to your chatbot icon

const Tours = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    }
  }, []);


   // Toggle theme (light/dark)
   const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme); // Save theme to localStorage
    document.body.classList.toggle('dark-theme', !isDarkMode); // Apply dark-theme class
  };

  return (
    <>
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
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />

      {/* Chatbot Button */}
      <button
        onClick={toggleChatbot}
        style={{
          position: 'fixed',
          bottom: '40px',
          right: '30px',
          height: '100px',
          width: '100px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          zIndex: '1000',
        }}
      >
        <img
          src={chatbotIcon}
          alt="Chatbot"
          style={{ width: '100px', height: '100px' }}
        />
      </button>

      {/* Chatbot iframe */}
      {showChatbot && (
        <iframe
          src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/11/17/07/20241117073438-229OFMC2.json"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            border: 'none',
            zIndex: '1000',
            borderRadius: '15px', /* Rounded corners */
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', /* Soft shadow for depth */
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', /* Smooth transition effects */
          }}
          title="Chatbot"
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'; /* Slight zoom effect */
            e.target.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.3)'; /* Enhanced shadow on hover */
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'; /* Reset zoom */
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'; /* Reset shadow */
          }}
        ></iframe>
      )}
    </>
  );
};

export default Tours;
