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
    reminder: string;
}

type Props = {
	userName : string;
}

const Home = ({userName}: Props) => {

	const fakeData : Task[] = [
        { id: 1, checkbox: false, description: "Task 1", tag: "inf133", priority: "!", dueDate: "2024-12-01T09:00", reminder: "1 hour before" },
        { id: 2, checkbox: false, description: "Task 2", tag: "inf132", priority: "!!",  dueDate: "2024-12-05T14:30", reminder: "1 day before"},
    ];


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
			<Calendar taskData={fakeData}/>
			<Tasks taskData={fakeData}/>

		</div>
	)
}

export default Home