import React from 'react';
import './HomePage.scss';
import NavBar from './NavBar';
import CompanyName from './CompanyName';

// Our HomePage
const HomePage = () => {
    return (
        <div className="homepage-container">
            <NavBar />
            <CompanyName />
        </div>
    );
}

export default HomePage;