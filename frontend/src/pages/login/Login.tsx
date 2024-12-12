import React, { useState } from 'react';
import sproutLogo from '../../static/sprout_logo.png';
import './Login.css';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {

}

const Login = (props: Props) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async () => {
		/* 
			this function handles logging in
			- uses email, password
		*/
		// TODO: call to api to ensure that the email and password are correct, return user name
		try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result.message || "Failed to login.");
            }
			else{
				const { token, userName } = result.data;
				localStorage.setItem('jwtToken', token);
				sessionStorage.setItem('userName', userName);
				sessionStorage.setItem('isAuthenticated', 'true');
				// Update app state and redirect
				navigate('/home'); // Replace with your desired redirect path
				setError('');
			}
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again later.');
			navigate('/'); 
        }
	}


	return (
		<div className='page-container'>
			<h1 className='logo-name'>sprout</h1>
			<img src={sproutLogo} alt="sprout logo" className='logo-image' />
			<div className="login-container">
				<h2>LOGIN</h2>
				<form action="post" className='login-form'>
					<label htmlFor="email">email</label>
					<input id="email" type="text" value={email} className='input-box' onChange={(e) => setEmail(e.target.value)}/>
					<label htmlFor="password">password</label>
					<input id="password" type="password" name="password" value={password} className='input-box' onChange={(e) => setPassword(e.target.value)}/>
					<button type='submit' className='submit-button' onClick={handleLogin}>LOGIN</button>
				</form>
			</div>
			<p>{error}</p>
			<p>Need an account? <a href='/signup' >Sign up</a></p>

		</div>
	)
}

export default Login