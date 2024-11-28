import React, { useState } from 'react';
import './Tasks.css';
import deleteIcon from '../../../static/delete_icon.png';
import sortIcon from '../../../static/sort_icon.png';

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

    const tagColors : {[key: string] : string} = {
        "inf133": "brown"
    }

    const priorityColors : {[key: string] : string} = {
        "!": "low",
        "!!": "medium",
        "!!!": "high"
    }

    return (
        <div className='task-table-container'>
            <table>
                <thead>
                    <tr>
                        <th>done?</th>
                        <th>description</th>
                        <th>tag</th>
                        <th>
                            priority
                            <img src={sortIcon} alt="sort" className='sort-img' />
                        </th>
                        <th>
                            due date
                            <img src={sortIcon} alt="sort" className='sort-img' />
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} className={`${row.checkbox ? 'checked-task' : ''}`}>
                            <td>
                                <input
                                    type="checkbox"
                                    className='checkbox'
                                    checked={row.checkbox}
                                    onChange={() => handleCheckboxChange(row.id)}
                                />
                            </td>
                            <td>{row.description}</td>
                            <td>
                                <div className={`table-tag-container ${tagColors[row.tag]}`}>
                                    {row.tag}
                                </div>
                            </td>
                            <td>
                                <div className={`table-tag-container ${priorityColors[row.priority]}`}>
                                    {row.priority}
                                </div>
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