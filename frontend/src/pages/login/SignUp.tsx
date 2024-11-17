import React from 'react';
import sproutLogo from '../../static/sprout_logo.png';

type Props = {}

const SignUp = (props: Props) => {
  return (
    <div className='page-container'>
      <h1 className='logo-name'>sprout</h1>
      <img src={sproutLogo} alt="sprout logo" className='logo-image' />
      <div className="login-container">
          <h2>SIGN UP</h2>
          <form action="post" className='login-form'>
              <label htmlFor="email">email</label>
              <input id="email" type="text" className='input-box' />
              <label htmlFor="password">password</label>
              <input id="password" type="password" name="password" className='input-box' />
              <label htmlFor="password">confirm password</label>
              <input id="confirm-password" type="password" name="confirm-password" className='input-box' />
              <button type='submit' className='submit-button'>SIGN UP</button>
          </form>
      </div>
      <p>Have an account? <a href='/' >Login</a></p>
    </div>
  )
}

export default SignUp