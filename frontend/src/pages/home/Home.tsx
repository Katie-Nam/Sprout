import React, { useEffect, useState } from 'react';
import sproutImg from '../../static/sprout_logo.png';
import './Home.css';
import Calendar from './Calendar/Calendar';
import Tasks from './Tasks/Tasks';
import Quotes from './Quotes/Quotes';

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

	const [taskData, setTaskData] = useState<Task[] | null>(null);
	const [tagColors, setTagColors] = useState<{ [key: string]: string } | null>(null);

	const userName = sessionStorage.getItem('userName');

	// const fakeData : Task[] = [
    //     { id: 1, checkbox: false, description: "Task 1", tag: "inf133", priority: "!", dueDate: "2024-12-01T09:00", reminder: "1 hour before" },
    //     { id: 2, checkbox: false, description: "Task 2", tag: "inf132", priority: "!!",  dueDate: "2024-12-05T14:30", reminder: "1 day before"},
    // ];

	// const tagColors = {
    //     // TODO: figure out way to store colors and assign them
    //     inf133: "brown",
    //     inf132: "green"
    // }


	const fetchTagColors = async () => {
		try {
            const response = await fetch('http://localhost:5001/api/tags/get-tags', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const result = await response.json();
            if (response.ok) {
				setTagColors(result.data);
            }
		
        } catch (error) {
		}
	}


	const handleLogoutClick = () => {
		/*
		this function logs the user out
		*/
		sessionStorage.removeItem('isAuthenticated');
		sessionStorage.removeItem('userName');
    	window.location.href = '/'; // Redirect to login

	}

	useEffect(() => {
		fetchTagColors();
	}, [])


	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await fetch('http://localhost:5001/api/get-tasks', {
			  method: 'GET',
			  headers: { 'Content-Type': 'application/json' },
			});
	
			const result = await response.json();
			if (response.ok) {
			  setTaskData(result);
			}
		  } catch (error) {
			console.error('Error fetching task data:', error);
		  }
		};
	
		fetchData(); // Initial fetch
	
		const intervalId = setInterval(fetchData, 100);
	
		return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
	  }, []);



	return (
		<div className='page-container background'>
			<div className="header-container">
				<img src={sproutImg} alt="sprout logo" className='corner-logo' />
				<button className='logout-button' onClick={handleLogoutClick}>logout</button>
			</div>
			<p className='header-text'>welcome {userName ? userName.toLowerCase() : "user"}!</p>
			<Calendar taskData={taskData} tagColors={tagColors}/>
			<Quotes />
			<Tasks taskData={taskData} tagColors={tagColors}/>

		</div>
	)
}

export default Home