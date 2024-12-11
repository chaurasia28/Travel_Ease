// import React from 'react'
// import './newsletter.css'

// import { Container, Row, Col } from 'reactstrap';
// import maleTourist from '../assets/images/male-tourist.png';

// const Newsletter = () => {
//   return <section className='newsletter'>
//       <Container>
//           <Row>
//               <Col lg='6'>
//                   <div className="newsletter__content">
//                       <h2>Subscribe now to get useful traveling information</h2>

//                       <div className="newsletter__input">
//                           <input type='email' placeholder='Enter your email' />
//                            <button className="btn newsletter__btn">Subscribe</button>
//                       </div>

//                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A expedita reprehenderit distinctio quibusdam neque officiis aliquid rerum dicta totam, itaque saepe cupiditate reiciendis sunt nemo dolor sed, dolorem suscipit ipsam!</p>

//                   </div>
//               </Col>
//               <Col lg='6'>
//                   <div className="newsletter__img">
//                       <img src={maleTourist} alt="" />
//                   </div>
//               </Col>
//           </Row>
//     </Container>
//   </section>
// }

// export default Newsletter

import React, { useState } from 'react';
import './newsletter.css';

import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

const Newsletter = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <section className={`newsletter ${isDarkMode ? 'newsletter-dark' : ''}`}>
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information</h2>

              <div className="newsletter__input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A expedita reprehenderit distinctio quibusdam
                neque officiis aliquid rerum dicta totam, itaque saepe cupiditate reiciendis sunt nemo dolor sed, dolorem
                suscipit ipsam!
              </p>

              <button onClick={toggleDarkMode} className="btn btn-dark">
                Toggle Dark Mode
              </button>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="Tourist" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
