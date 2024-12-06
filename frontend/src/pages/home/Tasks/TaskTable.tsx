import React, { useEffect, useRef, useState } from 'react';
import './Tasks.css';
import deleteIcon from '../../../static/delete_icon.png';
import sortIcon from '../../../static/sort_icon.png';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';

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
    taskData : Task[] | null;
    handleOpenPopup: (id: number) => void;
}

const TaskTable = ({handleOpenPopup, tagFilter, priorityFilter, dateRangeFilter, tagColors, taskData}: Props) => {
    const priorityColors : {[key: string] : string} = {
        "!": "low",
        "!!": "medium",
        "!!!": "high"
    }

    const dateRange: { [key: string]: Date } = {
        "today": new Date(),
        "last week": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        "last month": new Date(Date.now() - 31 * 24 * 60 * 60 * 1000),
    };

    const [rows, setRows] = useState<Task[] | null >(taskData);
    const [prioritySortDesc, setPrioritySort] = useState(true);
    const [dueDateSortDesc, setDueDateSort] = useState(true);

    const [deleteVisible, setDeleteVisible] = useState(false);
    const [deleteID, setDeleteID] = useState<number | null>(null);

    const originalData = useRef<Task[] | null>(taskData); // Immutable original data


    useEffect(() => {
        originalData.current = taskData;
        setRows(taskData);
	}, [taskData])


    const retrieveTasks = () => {
        /*
            this function sorts and filters the rows based on the selected filters and sort
        */
        if (!originalData.current) return;
        let filteredRows = originalData.current;
        // TODO: retrieve rows, based in the priority filter, tag filter, and date range filter, and due date sort and priority sort
        // make the completed checkboxes at the end

        console.log("begin", tagFilter, priorityFilter, dateRangeFilter);
        console.log(rows);

        filteredRows = filteredRows != null ? filteredRows.filter((row) => {
            
            const rowDate = new Date(row.dueDate);
            const isInDateRange =
                dateRangeFilter in dateRange
                    ? rowDate >= dateRange[dateRangeFilter]
                    : true;
            const matchesTag = tagFilter != "all" ? row.tag === tagFilter : true;
            const matchesPriority = priorityFilter != "all" ? row.priority === priorityFilter : true;
            
    
            return isInDateRange && matchesTag && matchesPriority;
        }) : [];


        // Sort rows: dueDate > priority > checkbox 
        const sortedRows = filteredRows.sort((a, b) => {
            const dateA = new Date(a.dueDate).getTime();
            const dateB = new Date(b.dueDate).getTime();


            if (dueDateSortDesc){
                if (dateA !== dateB) {
                    return dateA - dateB; // descending order
                }
            }
            else{
                if (dateA !== dateB) {
                    return dateB - dateA; // ascending order
                }
            }

            // Sort by priority ("!!!" > "!!" > "!")
            const priorityMap:  { [key: string]: number }  = { "!!!": 3, "!!": 2, "!": 1 };
            const priorityA = priorityMap[a.priority] || 0;
            const priorityB = priorityMap[b.priority] || 0;
            
            if (prioritySortDesc){
                if (priorityA !== priorityB) {
                    return priorityB - priorityA; // Descending order
                }
            }
            else{
                if (priorityA !== priorityB) {
                    return priorityA - priorityB; // Ascending order
                }
            }
            

            // Move completed tasks (checkbox: true) to the end
            return a.checkbox === b.checkbox ? 0 : a.checkbox ? 1 : -1;
        });

        setRows(sortedRows);
    }


    function formatDatetimeString(datetimeString: string) {
        /*
            this function reformats a datetime string to be formatted like datetime-local
        */
        const date = new Date(datetimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const handleCheckboxChange = (id: number) => {
        /*
            this function handles a click to a row's checkbox by graying it out if its selected
            and ungraying it otherwise
                - updates its status in the db
        */
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

    const openDeletePopup = (id: number) => {
        /*
            this function handles a click to a row's delete icon by raising a confirmation popup
        */
        setDeleteID(id);
        setDeleteVisible(true);
    };
      

    useEffect(() => {
        /*
            this event listener handles changes to the filters or sort
        */
        setRows(originalData.current);
        retrieveTasks();
    }, [prioritySortDesc, dueDateSortDesc, dateRangeFilter, tagFilter, priorityFilter])



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
                                <button onClick={() => openDeletePopup(row.id)} className='delete-button'>
                                    <img src={deleteIcon} alt="delete" className='delete-icon' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deleteVisible && <DeleteConfirmationPopup deleteID={deleteID} setDeleteVisible={setDeleteVisible}/>}
        </div>
    )
}

export default TaskTable