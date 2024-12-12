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

type Props = {
    taskData : Task[] | null;
    tagColors : {[key: string] : string} | null;
}

const Tasks = ({taskData, tagColors}: Props) => {
    const [selectedTag, setTagFilter] = useState("all");
    const [selectedPriority, setPriorityFilter] = useState("all");
    const [selectedDateRange, setDateRangeFilter] = useState("all");
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAdd, setPopupType] = useState(false);
    const [selectedRow, setSelectedRow] = useState<null | number>(null);
    
    const handleOpenPopup = (id : number) => {
        /*
        this function handles when a task row is clicked -> editing the row
        */
        setPopupVisible(true);
        setPopupType(false);
        setSelectedRow(id);
    }

    const handleAddTask = () => {
        /*
        this function handles when the add task button is clicked
        */
        setPopupType(true);
        setPopupVisible(true);
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
                    <select name="tag" id="tag" value={selectedTag} onChange={(e) => setTagFilter(e.target.value)}>
                        <option value="all">all</option>
                        <option value="inf133">inf133</option>
                        <option value="inf132">inf132</option>
                        <option value="inf131">inf131</option>
                    </select>
                </div>
                {/* priority filter */}
                <div className="filter">
                    <label htmlFor="priority">priority</label>
                    <select name="priority" id="priority" value={selectedPriority} onChange={(e) => setPriorityFilter(e.target.value)}>
                        <option value="all">all</option>
                        <option value="!">!</option>
                        <option value="!!">!!</option>
                        <option value="!!!">!!!</option>
                    </select>
                </div>
                {/* date range */}
                <div className="filter">
                    <label htmlFor="date-range">date range</label>
                    <select name="date-range" id="date-range" value={selectedDateRange} onChange={(e) => setDateRangeFilter(e.target.value)}>
                        <option value="all">all</option>
                        <option value="today">today</option>
                        <option value="last week">last week</option>
                        <option value="last month">last month</option>
                    </select>
                </div>
            </div>
            <TaskTable tagFilter={selectedTag} priorityFilter={selectedPriority} dateRangeFilter={selectedDateRange} handleOpenPopup={handleOpenPopup} tagColors={tagColors} taskData={taskData}/>
            {popupVisible && <TaskPopup isAdd={isAdd} setPopupVisible={setPopupVisible} currentTagColors={tagColors}  rowID={selectedRow} tasksData={taskData}/>}
        </div>
    )
}

export default Tasks