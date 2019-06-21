import React, { Component } from 'react';
import './Register.scss';
import NavBar from '../homepage/NavBar';
import RegisterForm from '../registerForm/RegisterForm';

class Register extends Component {
    state = {}
    render() {
        return (
            <>
                <NavBar />
                <div className="bookflight-container">
                    <RegisterForm />
                </div>
            </>
        );
    }
}

export default Register;