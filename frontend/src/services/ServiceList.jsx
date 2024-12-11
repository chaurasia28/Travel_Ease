import React from 'react'
import ServiceCard from './ServiceCard';
import {Col} from "reactstrap";

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData=[
  { 
    imgUrl: weatherImg, 
    title: 'Calculate Weather',
    desc: 'Stay informed with real-time weather updates tailored to your exact location. Know what to expect before you step out with accurate forecasts, from hourly predictions to daily outlooks.Plan your day with confidence using our reliable weather service.'
  },
  {
    imgUrl: guideImg,
    title: 'Best Tour Guides', 
    desc: 'Unleash the explorer in you with local experts. Discover hidden gems and craft unforgettable adventures with knowledgeable tour guides who know your destination like the back of their hand. Let them curate a personalized itinerary .'
  },
  {
    imgUrl: customizationImg,
    title: 'Customization', 
    desc: "Tailor your tour experience to your exact preferences. Whether you're an adrenaline junkie, a culture enthusiast, or a laid-back explorer, our local guides can craft a custom itinerary just for you. From the pace to the activities, you're in control of your adventure."
  },
]
const ServiceList = () => {
  return <>
   {
      servicesData.map((item,index)=>(
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item}/>
      </Col>
      ))
   }
  </> 
}

export default ServiceList;