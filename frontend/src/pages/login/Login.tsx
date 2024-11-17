import React from 'react';
import sproutLogo from '../../static/sprout_logo.png';
import './Login.css';

type Props = {

}

const Login = (props: Props) => {

  return (
    <div className='page-container'>
        <h1 className='logo-name'>sprout</h1>
        <img src={sproutLogo} alt="sprout logo" className='logo-image' />
        <div className="login-container">
            <h2>LOGIN</h2>
            <form action="post" className='login-form'>
                <label htmlFor="email">email</label>
                <input id="email" type="text" className='input-box' />
                <label htmlFor="password">password</label>
                <input id="password" type="password" name="password" className='input-box' />
                <button type='submit' className='submit-button'>LOGIN</button>
            </form>
        </div>
        <p>Need an account? <a href='/signup' >Sign up</a></p>

    </div>
  )
}

export default Login