import React, { useState } from 'react'
import './Tasks.css';
import addIcon from '../../../static/add_icon.png'
import TaskTable from './TaskTable';
import TaskPopup from './TaskPopup';

type Props = {}

const Tasks = (props: Props) => {

    const [selectedTag, setTagFilter] = useState("all");
    const [selectedPriority, setPriorityFilter] = useState("all");
    const [selectedDateRange, setDateRangeFilter] = useState("all");
    const [popupVisible, setPopupVisible] = useState(false);

    const handleTagClick = (event : React.ChangeEvent<HTMLSelectElement> ) => {
        setTagFilter(event.target.value)
    }

    const handlePriorityClick = (event : React.ChangeEvent<HTMLSelectElement> ) => {
        setPriorityFilter(event.target.value)
    }

    const handleDateRangeClick = (event : React.ChangeEvent<HTMLSelectElement> ) => {
        setDateRangeFilter(event.target.value)
    }

    return (
        <div className='task-container'>
            <div className="header-container">
                <h1>tasks!</h1>
                <img src={addIcon} alt="add icon" className='add-icon' onClick={() => setPopupVisible(!popupVisible)}/>
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
            <TaskTable tagFilter={selectedTag} priorityFilter={selectedPriority} dateRangeFilter={selectedDateRange}/>
            {popupVisible && <TaskPopup isAdd={true} setPopupVisible={setPopupVisible}/>}


        </div>
    )
}

export default Tasks