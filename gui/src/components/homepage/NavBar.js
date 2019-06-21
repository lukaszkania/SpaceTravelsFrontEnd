import React from 'react';
import './NavBar.scss'
import { Link } from 'react-router-dom';

const NavBar = () => {
    // Navigation bar, displayed on every page
    return (
        <div className="navbar-container">
            <div className="nav-item">
                <Link to="/">
                    <h4>Home</h4>
                </Link>
            </div>

            <div className="nav-item">
                <Link to="/register">
                    <h4>Register</h4>
                </Link>
            </div>

            <div className="nav-item">
                <Link to="/login">
                    <h4>Login</h4>
                </Link>
            </div>

            <div className="nav-item">
                <Link to="/flights">
                    <h4>Flights</h4>
                </Link>

            </div>

            <div className="nav-item">
                <Link to="/tourists">
                    <h4>Tourists</h4>
                </Link>

            </div>
        </div>
    );
}

export default NavBar;