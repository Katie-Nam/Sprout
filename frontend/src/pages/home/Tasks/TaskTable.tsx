import React, { useEffect, useState } from 'react';
import './Tasks.css';
import deleteIcon from '../../../static/delete_icon.png';
import sortIcon from '../../../static/sort_icon.png';

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
    tagFilter : string;
    priorityFilter : string;
    dateRangeFilter : string;
    tagColors : {[key: string] : string};
    handleOpenPopup: (id: number) => void;
    setTasksData: React.Dispatch<React.SetStateAction<Task[] | null>>;
}

const TaskTable = ({handleOpenPopup, tagFilter, priorityFilter, dateRangeFilter, tagColors, setTasksData}: Props) => {
    const priorityColors : {[key: string] : string} = {
        "!": "low",
        "!!": "medium",
        "!!!": "high"
    }

    const fakeData : Task[] = [
        { id: 1, checkbox: false, description: "Task 1", tag: "inf133", priority: "!", dueDate: "2024-12-01T09:00", reminder: "1 hour before" },
        { id: 2, checkbox: false, description: "Task 2", tag: "inf132", priority: "!!",  dueDate: "2024-12-05T14:30", reminder: "1 day before"},
    ];

    const [rows, setRows] = useState<Task[] | null >(null);

    const retrieveTasks = () => {
        // TODO: retrieve rows, based in the priority filter, tag filter, and date range filter, and due date sort and priority sort
        // make the completed checkboxes at the end
        setRows(fakeData);
    }
    
    setTasksData(rows);

    const [prioritySortDesc, setPrioritySort] = useState(true);
    const [dueDateSortDesc, setDueDateSort] = useState(true);

    function formatDatetimeString(datetimeString: string) {
        const date = new Date(datetimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const handleCheckboxChange = (id: number) => {
        setRows((prevRows) =>
            prevRows
                ? prevRows.map((row) =>
                      row.id === id ? { ...row, checkbox: !row.checkbox } : row
                  )
                : [] // Default to an empty array if prevRows is null
        );

        // TODO: handle checkbox change
        const updatedRow = rows != null ? rows.find((row) => row.id === id) : null;
        if (updatedRow != null) {
            const updatedCheckbox = updatedRow.checkbox;
            // handle checkbox change in db

            // update rows
            retrieveTasks();
        }


    };

    const handleDelete = (id: number) => {
        // TODO: make handle delete
        setRows((prevRows) => prevRows ? prevRows.filter((row) => row.id !== id) : []);
        // handle delete
    };
      

    useEffect(()=> {
        // update the rows inside of overall task container
        setTasksData(rows);
    }, [rows])

    useEffect(() => {
        // TODO: handle priority sort
        retrieveTasks();

    }, [prioritySortDesc, dueDateSortDesc])



    return (
        <div className='task-table-container'>
            <table>
                <thead>
                    <tr>
                        <th>done?</th>
                        <th>description</th>
                        <th>tag</th>
                        <th onClick={()=>setPrioritySort(!prioritySortDesc)}>
                            priority
                            <img src={sortIcon} alt="sort" className={`sort-img ${prioritySortDesc ? "" : "asc"}`}  />
                        </th>
                        <th  onClick={()=>setDueDateSort(!dueDateSortDesc)}>
                            due date
                            <img src={sortIcon} alt="sort" className={`sort-img ${dueDateSortDesc ? "" : "asc"}`}/>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows != null && rows.map((row) => (
                        <tr key={row.id} className={`${row.checkbox ? 'checked-task' : ''}`}>
                            <td>
                                <input
                                    type="checkbox"
                                    className='checkbox'
                                    checked={row.checkbox}
                                    onChange={() => handleCheckboxChange(row.id)}
                                />
                            </td>
                            <td onClick={() => handleOpenPopup(row.id)}>{row.description}</td>
                            <td onClick={() => handleOpenPopup(row.id)}>
                                <div className={`table-tag-container ${tagColors[row.tag]}`}>
                                    {row.tag}
                                </div>
                            </td>
                            <td onClick={() => handleOpenPopup(row.id)}>
                                <div className={`table-tag-container ${priorityColors[row.priority]}`}>
                                    {row.priority}
                                </div>
                            </td>
                            <td onClick={() => handleOpenPopup(row.id)}>{formatDatetimeString(row.dueDate)}</td>
                            <td>
                                <button onClick={() => handleDelete(row.id)} className='delete-button'>
                                    <img src={deleteIcon} alt="delete" className='delete-icon' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className='popup-background'>
                <div className="popup-container">
                </div>

            </div> */}
        </div>
    )
}

export default TaskTable