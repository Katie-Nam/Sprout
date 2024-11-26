import React, { useState } from 'react';
import './Tasks.css';
import deleteIcon from '../../../static/delete_icon.png'

type Props = {
    tagFilter : string;
    priorityFilter : string;
    dateRangeFilter : string;
}

const TaskTable = (props: Props) => {
    const [rows, setRows] = useState([
        { id: 1, checkbox: false, description: "Task 1", tag: "inf133", priority: "!", dueDate: "2024-12-01" },
        { id: 2, checkbox: false, description: "Task 2", tag: "inf132", priority: "!!",  dueDate: "2024-12-05" },
    ]);

    const handleCheckboxChange = (id: number) => {
        console.log(id);
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id ? { ...row, checkbox: !row.checkbox } : row
            )
        );
    };

    const handleDelete = (id: number) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    return (
        <div className='task-table-container'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>description</th>
                        <th>tag</th>
                        <th>priority</th>
                        <th>due date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    className='checkbox'
                                    checked={row.checkbox}
                                    onChange={() => handleCheckboxChange(row.id)}
                                />
                            </td>
                            <td>{row.description}</td>
                            <td>{row.tag}</td>
                            <td>
                                {row.priority}
                            </td>
                            <td>{row.dueDate}</td>
                            <td>
                                <button onClick={() => handleDelete(row.id)} className='delete-button'>
                                    <img src={deleteIcon} alt="delete" className='delete-icon' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskTable