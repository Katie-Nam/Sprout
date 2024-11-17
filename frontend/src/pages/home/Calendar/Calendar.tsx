import React, {useState} from 'react';
import CalendarItem from './CalendarItem/CalendarItem';
import Events from './Events/Events';

type Props = {}

const Calendar = (props: Props) => {
    const [selectedDay, setSelectedDay] = useState<Date>(new Date()); // Default to today's date
    return (
        <div className='calendar-encapsulating-container'>
            <CalendarItem onDaySelect={(day: Date) => setSelectedDay(day)} />
            <Events selectedDate={selectedDay} />
        </div>
    );
}

export default Calendar