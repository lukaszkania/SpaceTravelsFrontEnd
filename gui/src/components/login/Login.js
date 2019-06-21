import React, { Component } from 'react';
import LoginForm from '../loginForm/LoginForm';
import NavBar from '../homepage/NavBar';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <NavBar />
                <br />
                <LoginForm />
            </div>
        );
    }
}

export default Login;