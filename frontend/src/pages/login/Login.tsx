import React, { useState } from 'react';
import sproutLogo from '../../static/sprout_logo.png';
import './Login.css';

type Props = {

}

const Login = (props: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		/* 
			this function handles logging in
			- uses email, password
		*/
		// TODO: call to api to ensure that the email and password are correct, return user name
		if (true){
			sessionStorage.setItem('userName', 'Celine Trieu');
			sessionStorage.setItem('isAuthenticated', 'true');
    		window.location.href = '/home'; // Redirect after login
		}
		else{
    		window.location.href = '/'; // Redirect after login
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
			<p>Need an account? <a href='/signup' >Sign up</a></p>

		</div>
	)
}

export default Login