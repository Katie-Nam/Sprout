import React, {useState} from 'react';
import CalendarItem from './CalendarItem/CalendarItem';
import Events from './Events/Events';


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
    taskData : Task[] | null;
    
}

const Calendar = ({taskData}: Props) => {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date()); // Default to today's date

    return (
        <div className='calendar-encapsulating-container'>
            <CalendarItem onDaySelect={(day: Date) => setSelectedDay(day)} />
            <Events selectedDate={selectedDay} taskData={taskData}/>
        </div>
    );
}

export default Calendar