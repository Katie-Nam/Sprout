import React, { useState } from 'react'
import './Tasks.css';
import addIcon from '../../../static/add_icon.png'
import TaskTable from './TaskTable';
import TaskPopup from './TaskPopup';

interface Task {
    id: number;                // Unique identifier for the task
    checkbox: boolean;         // Checkbox state (true for checked, false for unchecked)
    description: string;       // Task description
    tag: string;               // Tag/category for the task
    priority: string;          // Priority indicator, e.g., "!", "!!"
    dueDate: string;           // Due date as an ISO 8601 string
    reminder: string;
}
type Props = {}

const Tasks = (props: Props) => {

    const [selectedTag, setTagFilter] = useState("all");
    const [selectedPriority, setPriorityFilter] = useState("all");
    const [selectedDateRange, setDateRangeFilter] = useState("all");
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAdd, setPopupType] = useState(false);
    const [selectedRow, setSelectedRow] = useState<null | number>(null)
    const [tasksData, setTasksData] = useState<Task[] | null>(null);
    

    const handleTagClick = (event : React.ChangeEvent<HTMLSelectElement> ) => {
        setTagFilter(event.target.value)
    }

    const handlePriorityClick = (event : React.ChangeEvent<HTMLSelectElement> ) => {
        setPriorityFilter(event.target.value)
    }

    const handleDateRangeClick = (event : React.ChangeEvent<HTMLSelectElement> ) => {
        setDateRangeFilter(event.target.value)
    }

    const handleOpenPopup = (id : number) => {
        setPopupVisible(true);
        setPopupType(false);
        setSelectedRow(id);
    }

    const handleAddTask = () => {
        setPopupType(true);
        setPopupVisible(true);
    }

    const tagColors = {
        // TODO: figure out way to store colors and assign them
        inf133: "brown",
        inf132: "green"
    }

    return (
        <div className='task-container'>
            <div className="header-container">
                <h1>tasks!</h1>
                <img src={addIcon} alt="add icon" className='add-icon' onClick={handleAddTask}/>
            </div>
            <div className="filter-container">
                {/* tag filter */}
                <div className="filter">
                    <label htmlFor="tags">tag</label>
                    <select name="tag" id="tag" value={selectedTag} onChange={handleTagClick}>
                        <option value="all">all</option>
                        <option value="inf133">inf133</option>
                        <option value="inf132">inf132</option>
                        <option value="inf131">inf131</option>
                    </select>
                </div>
                {/* priority filter */}
                <div className="filter">
                    <label htmlFor="priority">priority</label>
                    <select name="priority" id="priority" value={selectedPriority} onChange={handlePriorityClick}>
                        <option value="all">all</option>
                        <option value="!">!</option>
                        <option value="!!">!!</option>
                        <option value="!!!">!!!</option>
                    </select>
                </div>
                {/* date range */}
                <div className="filter">
                    <label htmlFor="date-range">date range</label>
                    <select name="date-range" id="date-range" value={selectedDateRange} onChange={handleDateRangeClick}>
                        <option value="all">all</option>
                        <option value="today">today</option>
                        <option value="last week">last week</option>
                        <option value="last month">last month</option>
                    </select>
                </div>
            </div>
            <TaskTable tagFilter={selectedTag} priorityFilter={selectedPriority} dateRangeFilter={selectedDateRange} handleOpenPopup={handleOpenPopup} tagColors={tagColors} setTasksData={setTasksData}/>
            {popupVisible && <TaskPopup isAdd={isAdd} setPopupVisible={setPopupVisible} currentTagColors={tagColors}  rowID={selectedRow} tasksData={tasksData}/>}
        </div>
    )
}

export default Tasks