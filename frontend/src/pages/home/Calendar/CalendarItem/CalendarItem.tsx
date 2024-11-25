import React, {useState} from 'react';
import '../Calendar.css';

type Props = {
    onDaySelect: (day: Date) => void;
}

const CalendarItem = ({onDaySelect}: Props) => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate()); // Default to today

    const getMonthDays = (year : number, month : number) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = firstDayOfMonth.getDay();

        // Fill days before the month starts
        const days : (number | null)[] = Array.from({ length: firstDayIndex }, () => null);

        // Fill days for the current month
        for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
        }

        return days;
    };

    const goToPreviousMonth = () => {
        const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1
        );
        setCurrentDate(newDate);
        setSelectedDay(null); // Reset selected day when month changes
    };

    const goToNextMonth = () => {
        const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1
        );
        setCurrentDate(newDate);
        setSelectedDay(null); // Reset selected day when month changes
    };

    const handleDayClick = (day: number | null) => {
        if (day) {
            setSelectedDay(day);

            const selectedDate = new Date(
                currentDate.getFullYear(), // Year
                currentDate.getMonth(),   // Month
                day                       // Day
            );
            
            onDaySelect(selectedDate); // Pass the selected day to the parent
        }
    };

    const renderDays = () => {
        const today = new Date(); // Get today's date
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const days = getMonthDays(year, month);


    
        return days.map((day, index) => {
            // Check if the day matches today's date
            const isToday =
                day &&
                today.getDate() === day &&
                today.getMonth() === month &&
                today.getFullYear() === year;
            
            const isSelected = day === selectedDay;
    
            return (
                <div
                    key={index}
                    className={`day ${day ? "" : "empty"} ${
                        isSelected ? "selected-day" : ""
                    }`}
                    onClick={() => handleDayClick(day)}
                    >
                    {day}
                </div>
            );
        });
    };

    return (
        <div className='calendar-container'>
            <header className="calendar-header">
                <button className="calendar-button" onClick={goToPreviousMonth}>{"<"}</button>
                <h2>
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
                </h2>
                <button className="calendar-button" onClick={goToNextMonth}>{">"}</button>
            </header>
            <div className="calendar-grid">
                {/* Day Headers */}
                <div className="day-headers">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="day-header">
                    {day}
                    </div>
                ))}
                </div>
                {/* Calendar Days */}
                <div className="calendar-days">
                {renderDays()}
                </div>
            </div>
        </div>
    )
}

export default CalendarItem