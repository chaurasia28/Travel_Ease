import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const locationRef = useRef();
    const distanceRef = useRef();
    const maxGroupSizeRef = useRef();
    const navigate = useNavigate();

    const searchHandler = async () => {
        const location = locationRef.current.value;
        const distance = distanceRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value; // Corrected

        if (location === '' || distance === '' || maxGroupSize === '') {
            return alert('All fields are required');
        }

        const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`);
        
        if (!res.ok) {
            alert('Something went wrong');
            return; // Exit the function if the fetch fails
        }

        const result = await res.json();
        navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: result.data });
    };

    return (
        <Col lg='12'>
            <div className="search__bar">
                <Form className="d-flex align-items-center gap-4">
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span>
                            <i className="ri-map-pin-line"></i>
                        </span>
                        <div>
                            <h6>Location</h6>
                            <input 
                                type="text" 
                                placeholder="Where are you going?" 
                                ref={locationRef} // Attach ref here
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span>
                            <i className="ri-map-pin-time-line"></i>
                        </span>
                        <div>
                            <h6>Distance</h6>
                            <input 
                                type="number" 
                                placeholder="Distance K/m" 
                                ref={distanceRef} 
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-last">
                        <span>
                            <i className="ri-group-line"></i>
                        </span>
                        <div>
                            <h6>Max People</h6>
                            <input 
                                type="number" 
                                placeholder="0" 
                                ref={maxGroupSizeRef} // Attach ref here
                            />
                        </div>
                    </FormGroup>
                    <span 
                        className='search__icon' 
                        role='button' 
                        onClick={searchHandler} // Use onClick to call the function
                    >
                        <i className="ri-search-line"></i>
                    </span>
                </Form>
            </div>
        </Col>
    );
};

export default SearchBar;
