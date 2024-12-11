import React from 'react';
import './footer.css';

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.png";

const quick__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {

  const year = new Date().getFullYear();

  return <footer className="footer">
    <Container>
      <Row>
        <Col lg='3'>
          <div className="logo">
            <img src={logo} alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="social__links d-flex align-items-center gap-4">
              <span>
                <a href to='#'><i class="ri-youtube-line"></i></a>
              </span>
              <span>
                <a href to='#'><i class="ri-github-fill"></i></a>
              </span>
              <span>
                <a href to='#'><i class="ri-facebook-circle-line"></i></a>
              </span>
              <span>
                <a href to='#'><i class="ri-instagram-line"></i></a>
              </span>
            </div>
          </div>
        </Col>
        <Col lg='3'>
          <h5
            className='footer__link-title'>Discover
          </h5>
          <ListGroup className='footer__quick-links'>
            {
              quick__links.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Col>
        <Col lg='3'>
          <h5
            className='footer__link-title'>Quick Links
          </h5>
          <ListGroup className='footer__quick-links'>
            {
              quick__links2.map((item, index) => (
                <ListGroupItem key={index} className='ps-0 border-0'>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Col>
        <Col lg='3'>
          <h5
            className='footer__link-title'>Contact
          </h5>
          <ListGroup className='footer__quick-links'>

            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
                  <i className="ri-map-pin-line"></i>
                  Address:
                </span>
              </h6>
              <p className='mb-0 contact-info'>
                <a href="https://maps.google.com?q=Rajpura,+Punjab">Punjab, India</a>
              </p>
            </ListGroupItem>

            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
                  <i className="ri-mail-line"></i>
                  Email:
                </span>
              </h6>
              <p className='mb-0 contact-info'>
                <a href="mailto:travelease48@gmail.com">travelease48@gmail.com</a>
              </p>
            </ListGroupItem>

            <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
              <h6 className='mb-0 d-flex align-items-center gap-2'>
                <span>
                  <i className="ri-phone-fill"></i>
                  Phone:
                </span>
              </h6>
              <p className='mb-0 contact-info'>
                <a href="tel:+919876543786">+91 9999999999</a>
              </p>
            </ListGroupItem>

          </ListGroup>
        </Col>
        <Col lg='12' className="text-center pt-5">
          <p className='copyright'>Copyright {year}, design and develop by Prerna Sharma & Priya Chaurasia. All rights reserved. </p>
        </Col>
      </Row>
    </Container>
  </footer>
};

export default Footer;

