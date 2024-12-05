import React, { useEffect, useState } from 'react';
import './Events.css';

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
	selectedDate : Date,
	taskData : Task[] | null;
}

const Events = ({selectedDate, taskData}: Props) => {
	const [data, setData] = useState<Task[] | null>(null)

	const [calendarItems, setCalendarItems] = useState<Task[] | null>(null);

	function getEvents(selectedDate : Date){
		// TODO make function to get all tasks on that selected day
		const selectedDateString = selectedDate.toISOString().split('T')[0];

		// Filter fakeData for matching due dates
		const items = data ? data.filter((task) => {
			const taskDate = task.dueDate.split('T')[0]; // Extract the date portion
			return taskDate === selectedDateString;     // Compare dates
		}) : [];

		// Update state with filtered items
		setCalendarItems(items);

	}

	useEffect(() => {
		setData(taskData);
		getEvents(selectedDate);
	}, [selectedDate])


	const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
          })
        : 'No date selected';

	const tagMap : {[key : string] : string} = {
		"inf133" : "brown"
	}

	return (
		<div className='events-container'>
			<h2 className='today-heading'>{formattedDate}</h2>
			{calendarItems != null && calendarItems.map((item, key) => (
				<div className='event-container'>
					<p key={key}>{item.description}</p>
					<div className='event-tag-container'>
						<div className={`tag-container ${item.priority ==  "!!" ? 'medium' : item.priority == '!' ? 'low' : 'high'}`}>
							<p>{item.priority}</p>
						</div>
						<div className={`tag-container brown ${tagMap[item.tag]}`}>
							<p>{item.tag}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Events