import React, { useState } from 'react';
import './Login.css';
import sproutLogo from '../../static/sprout_logo.png';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Sign up successful!');
            } else {
                setMessage(result.message || 'Sign up failed');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='page-container'>
            <h1 className='logo-name'>sprout</h1>
            <img src={sproutLogo} alt="sprout logo" className='logo-image' />
            <div className="login-container">
                <h2>SIGN UP</h2>
                <form onSubmit={handleSubmit} className='login-form'>
                    <label htmlFor="firstName">first name</label>
                    <input id="firstName" type="text" className='input-box' onChange={handleInputChange} />
                    <label htmlFor="lastName">last name</label>
                    <input id="lastName" type="text" className='input-box' onChange={handleInputChange} />
                    <label htmlFor="email">email</label>
                    <input id="email" type="text" className='input-box' onChange={handleInputChange} />
                    <label htmlFor="password">password</label>
                    <input id="password" type="password" className='input-box' onChange={handleInputChange} />
                    <label htmlFor="confirmPassword">confirm password</label>
                    <input id="confirmPassword" type="password" className='input-box' onChange={handleInputChange} />
                    <button type='submit' className='submit-button'>SIGN UP</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <p>Have an account? <a href='/' >Login</a></p>
        </div>
    );
};

export default SignUp;
