import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './../pages/Home';
import Tours from './../pages/Tours';
import TourDetails from './../pages/TourDetails';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import About from "./../pages/About";
import ContactUs from "./../pages/Contact";
import Thankyou from '../pages/Thankyou';
import SubscriptionPage from '../pages/SubscriptionPage'; 
import Admin from './../pages/Admin';
import Setting from './../pages/Setting';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path='/thank-you'  element={<Thankyou />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/admin" element={<Admin />} />  {/* Added new route for admin */}  {/* Added new component for admin */}  {/* Added new page for admin */}  {/* Added new route for admin */}  {/* Added new component for admin */}  {/* Added new page for admin */}  {/* Added new route for admin */}  {/* Added new component for admin */}  {/* Added new page for admin */}  {/* Added new route for admin */}  {/* Added new component for admin */}
      <Route path="/subscribe" element={<SubscriptionPage />} />
      <Route path="/setting" element={<Setting />} />  {/* Added new route for setting */}  {/* Added new component for setting */}  {/* Added new page for setting */}  {/* Added new route for setting */}  {/* Added new component for setting */}  {/* Added new page for setting */}  {/* Added new route for setting */}  {/* Added new component for setting */}  {/* Added new page for setting */}  {/* Added new route for setting */}  {/* Added new component for setting */}
    </Routes>
  );
};

export default Routers;
