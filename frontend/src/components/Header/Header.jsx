import TravelImg from "../../assets/images/travelBox.png"; 
import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthContext";
import "./header.css";
import { MdFlight, MdOutlineLocalHotel } from "react-icons/md";
import { IoIosWifi } from "react-icons/io";
import { IoFastFoodSharp } from "react-icons/io5";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/contact", display: "Contact" },
  { path: "/tours", display: "Tours" },
];

const countries = [
  "United States",
  "India",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "United Kingdom",
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Nation");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc);
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Handle logo click to navigate to Admin page
  const handleLogoClick = () => {
    navigate("/admin"); // Navigate to the Admin page
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* Logo - clickable to navigate to Admin page */}
            <div className="logo" onClick={handleLogoClick}>
              <img src={logo} alt="Logo" />
            </div>

            {/* Navigation Menu */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {navLinks.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}

                {/* Dropdown for Nation */}
                <li
                  className="nav__item nation__dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dropdown__toggle" onClick={toggleDropdown}>
                    {selectedCountry}
                    <i
                      className={`ri-arrow-${isDropdownOpen ? "up" : "down"}-s-line`}
                    ></i>
                  </div>
                  {isDropdownOpen && (
                    <ul className="dropdown__menu">
                      {countries.map((country, index) => (
                        <li
                          key={index}
                          className="dropdown__item"
                          onClick={() => handleCountrySelect(country)}
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>

            {/* Right Side */}
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              {/* Earth Icon */}
              <span className="earth__icon" onClick={togglePopup}>
                <i className="ri-earth-line"></i>
              </span>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>

      {/* Popup */}
      {isPopupOpen && (
        <div className={`popup__overlay ${isPopupOpen ? 'show' : ''}`} onClick={togglePopup}>
          <div className={`popup__content ${isPopupOpen ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
            <h2>Explore the World</h2>
            <div className="popup__body">
              <div className="popup__image">
                <img src={TravelImg} alt="Travel" className="popup__travel-img" />
              </div>
              <div className="popup__text">
                <p>
                  Explore amazing destinations with flights, hotels, food, and wifi!
                </p>
                <div className="features">
                  <div><MdFlight /> Flights</div>
                  <div><MdOutlineLocalHotel /> Hotels</div>
                  <div><IoIosWifi /> Wifi</div>
                  <div><IoFastFoodSharp /> Food</div>
                </div>
              </div>
            </div>
            <Button className="btn btn-dark" onClick={togglePopup}>Close</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
