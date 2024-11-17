import React from 'react';
import sproutImg from '../../static/sprout_logo.png';
import './Home.css';
import Calendar from './Calendar/Calendar';

type Props = {
	userName : string;
}

const Home = ({userName}: Props) => {
	return (
		<div className='page-container'>
			<div className="header-container">
				<img src={sproutImg} alt="sprout logo" className='corner-logo' />
				<p className='header-text'>Welcome {userName}!</p>
				<button className='logout-button'>logout</button>
			</div>
			<Calendar/>

		</div>
	)
}

export default Home