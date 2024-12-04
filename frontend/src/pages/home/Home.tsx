import React from 'react';
import sproutImg from '../../static/sprout_logo.png';
import './Home.css';
import Calendar from './Calendar/Calendar';
import Tasks from './Tasks/Tasks';

type Props = {
	userName : string;
}

const Home = ({userName}: Props) => {

	const handleLogoutClick = () => {
		// TODO

	}

	return (
		<div className='page-container background'>
			<div className="header-container">
				<img src={sproutImg} alt="sprout logo" className='corner-logo' />
				<button className='logout-button' onClick={handleLogoutClick}>logout</button>
			</div>
			<p className='header-text'>welcome {userName.toLowerCase()}!</p>
			<Calendar/>
			<Tasks/>

		</div>
	)
}

export default Home