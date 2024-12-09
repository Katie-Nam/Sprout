import React from 'react';
import sproutImg from '../../static/sprout_logo.png';
import './Home.css';
import Calendar from './Calendar/Calendar';
import Tasks from './Tasks/Tasks';

interface Task {
    id: number;                // Unique identifier for the task
    checkbox: boolean;         // Checkbox state (true for checked, false for unchecked)
    description: string;       // Task description
    tag: string;               // Tag/category for the task
    priority: string;          // Priority indicator, e.g., "!", "!!"
    dueDate: string;           // Due date as an ISO 8601 string
    reminder: string;		   // reminder as string
}

type Props = {

}

const Home = ({}: Props) => {

	const userName = sessionStorage.getItem('userName');

	const fakeData : Task[] = [
        { id: 1, checkbox: false, description: "Task 1", tag: "inf133", priority: "!", dueDate: "2024-12-01T09:00", reminder: "1 hour before" },
        { id: 2, checkbox: false, description: "Task 2", tag: "inf132", priority: "!!",  dueDate: "2024-12-05T14:30", reminder: "1 day before"},
    ];

	const tagColors = {
        // TODO: figure out way to store colors and assign them
        inf133: "brown",
        inf132: "green"
    }


	const handleLogoutClick = () => {
		/*
		this function logs the user out
		*/
		sessionStorage.removeItem('isAuthenticated');
    	window.location.href = '/'; // Redirect to login

	}

	return (
		<div className='page-container background'>
			<div className="header-container">
				<img src={sproutImg} alt="sprout logo" className='corner-logo' />
				<button className='logout-button' onClick={handleLogoutClick}>logout</button>
			</div>
			<p className='header-text'>welcome {userName ? userName.toLowerCase() : "user"}!</p>
			<Calendar taskData={fakeData} tagColors={tagColors}/>
			<Tasks taskData={fakeData} tagColors={tagColors}/>

		</div>
	)
}

export default Home