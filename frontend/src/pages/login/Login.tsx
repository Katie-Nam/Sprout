import React, { useState } from 'react';
import sproutLogo from '../../static/sprout_logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (!response.ok) {
                // Handle login error (e.g., invalid email or password)
                setError(result.message || "Failed to login.");
            } else {
                const { token, userName } = result.data;

                // Store token and user information
                localStorage.setItem('jwtToken', token);
                sessionStorage.setItem('userName', userName);
                sessionStorage.setItem('isAuthenticated', 'true');

                // Redirect to the home page
                navigate('/home');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='page-container'>
            <h1 className='logo-name'>sprout</h1>
            <img src={sproutLogo} alt="sprout logo" className='logo-image' />
            <div className="login-container">
                <h2>LOGIN</h2>
                <form className='login-form' onSubmit={handleLogin}>
                    <label htmlFor="email">email</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        className='input-box'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        className='input-box'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit' className='submit-button'>LOGIN</button>
                </form>
            </div>
            {error && <p className="error-message">{error}</p>}
            <p>Need an account? <a href='/signup'>Sign up</a></p>
        </div>
    );
};

export default Login;
