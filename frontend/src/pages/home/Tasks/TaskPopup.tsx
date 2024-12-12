import React, { useState } from 'react';
import './Tasks.css';
import closeImg from '../../../static/cancel_icon.png';
import addImg from '../../../static/add_icon_brown.png';
import dropdownImg from '../../../static/dropdown_icon.png';

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
    isAdd ?: boolean;
    // editDescription ?: string;
    // editTag ?: string;
    // editDueDate ?: string;
    // editReminder ?: string;
    // editPriority ?: string;
    currentTagColors : { [key: string]: string } | null;
    rowID ?: number | null;
    tasksData ?: Task[] | null;
    setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskPopup = ({isAdd, currentTagColors, rowID, tasksData, setPopupVisible}: Props) => {
    const priorityColors : {[key: string] : string} = {
        "!": "low",
        "!!": "medium",
        "!!!": "high"
    }

    // if this is an edit popup, find the selected row
    var selectedRow = null;
    if (tasksData && !isAdd){
        for (var i = 0; i < tasksData.length; i++){
            if (tasksData[i].id == rowID){
                selectedRow = i;
            }
        }
    }

    const [description, setDescription] = useState<string>(selectedRow != null && tasksData != null? tasksData[selectedRow].description : "");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string | null>(selectedRow != null && tasksData != null ? tasksData[selectedRow].tag : null);
    const [dueDate, setDueDate] = useState<string>(selectedRow != null && tasksData != null ? tasksData[selectedRow].dueDate: "");
    const [newTag, setNewTag] = useState<string>("");
    const [tagColors, setTagColors] = useState<{ [key: string]: string } | null>(currentTagColors);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState<string | null>(selectedRow != null && tasksData != null ? tasksData[selectedRow].reminder: null);
    const [priority, setPriority] = useState<string>(selectedRow != null && tasksData != null ? priorityColors[tasksData[selectedRow].priority]: "");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleReminderClick = (option: string) => {
        /*
            this function handles selecting a reminder
        */
        setSelectedReminder(option);
        setIsOpen(false); // Close the dropdown after selecting an option
    };
    

    const selectTag = (tag: string) => {
        /*
            this function handles selecting a tag
        */
        if (selectedTag === tag) {
            setSelectedTag(null); // Deselect the tag if it's double-clicked
        }
        else{
            setSelectedTag(tag);
        }
        
    };
    
    const handleAddNewTag = () => {
        /*
            this function handles adding a new tag
        */
        if (newTag.trim() && tagColors && !tagColors[newTag]) {
            // Add the new tag to the state
            setTagColors({
                ...tagColors,
                [newTag]: "gray" // Default color for new tags
            });
            setSelectedTag(newTag); // Select the newly added tag
            setNewTag(""); // Clear the input
        }
    };

    const handleSubmit = async () => {
        /*
            this function handles submitting and ensures and necessary fields are filled
        */
        if (description === ""){
            setErrorMessage("Error: Description is missing");
        }
        else if (dueDate === ""){
            console.log(dueDate);
            setErrorMessage("Error: No due date was set");
        }
        else if (selectedTag === ""){
            setErrorMessage("Error: No tag was selected");
        }
        else if (priority === ""){
            setErrorMessage("Error: No priority level was selected");
        }
        else if (selectedReminder === ""){
            setErrorMessage("Error: No reminder was selected");
        }

        if (errorMessage != ""){
            if (isAdd){
                console.log('Error: Failed to add task.')
            }
            else{
                console.log('Error: Failed to edit task.')
            }
            return;
        }



        // TODO: call to add/edit task
        // if the selected task doesnt exist in the db, add it
        if (isAdd){
            try {
                const response = await fetch('http://localhost:5001/api/add-task', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ description: description, tag: selectedTag, priority: priority, dueDate: dueDate, reminder: selectedReminder })
                });
        
                const result = await response.json();
                if (response.ok) {
                  console.log(result.data.message, result.data.taskId);
                }
              } catch (error) {
                console.error('Error adding task:', error);
              }
        }
        else{
            try {
                const response = await fetch('http://localhost:5001/api/edit-task', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: rowID, description: description, tag: selectedTag, priority: priority, dueDate: dueDate, reminder: selectedReminder })
                });
        
                const result = await response.json();
                if (response.ok) {
                  console.log(result.data.message);
                }
            } catch (error) {
                console.error('Error editing task:', error);
            }

        }

    }


    return (
        <div className='popup-background'>
            <div className="popup-container">
                <div className="popup-header-container">
                    <h1>{isAdd ? "add task" : "edit task"}</h1>
                    <img src={closeImg} alt="close" onClick={() => setPopupVisible(false)}/>
                </div>
                <div className="popup-content-container">
                    <label htmlFor="description">description *</label>
                    <input type="text" id="description" name='description' placeholder="description..." value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <label htmlFor="due-date">due date *</label>
                    <input type="datetime-local" id="due-date" name='due-date' value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                    <label className='priority-form-label'>priority level *</label>
                    <form action="" className='priority-form'>
                        <div className="radio-button">
                            <label htmlFor="low-priority">low</label>
                            <input type="radio" id="low-priority" name="priority" value="low" checked={priority == "low"} onChange={(e) => setPriority(e.target.value)}/>
                        </div>
                        <div className="radio-button">
                            <label htmlFor="medium-priority">medium</label>
                            <input type="radio" id="medium-priority" name="priority" value="medium" checked={priority == "medium"} onChange={(e) => setPriority(e.target.value)}/>
                        </div>
                        <div className="radio-button">
                            <label htmlFor="high-priority">high</label>
                            <input type="radio" id="high-priority" name="priority" value="high" checked={priority == "high"} onChange={(e) => setPriority(e.target.value)}/>
                        </div>
                    </form>
                    <label htmlFor="tags">tags *</label>
                    <div className='popup-encapsulating-tags-container'>
                        <div className="existing-tag-container">
                            {tagColors && Object.keys(tagColors).map((tag) => (
                                <button
                                key={tag}
                                onClick={() => selectTag(tag)}
                                className={`popup-tag-container ${selectedTag===tag ? tagColors[tag] : "gray"}`}
                                >
                                {tag}
                                </button>
                            ))}
                            
                        </div>
                        {
                            tagColors && Object.keys(tagColors).length <= 4 && (
                                <div className="add-tag-container">
                                <p>add tag</p>
                                <input type="text" placeholder="name" onChange={(e) => setNewTag(e.target.value)}/>
                                <img src={addImg} alt="add" onClick={handleAddNewTag}/>
                                </div>
                            )
                        }
                    </div>
                    <label htmlFor="reminders">reminders</label>
                    <div className='reminder-dropdown-container'>
                        {/* Dropdown button */}
                        <button onClick={toggleDropdown} className='reminder-dropdown-button'>
                            {selectedReminder || "Select an option"}
                            <img src={dropdownImg} alt="dropdown" />
                        </button>

                        {/* Dropdown options */}
                        {isOpen && (
                            <div className='reminder-dropdown-options'>
                                <div
                            
                                    onClick={() => handleReminderClick("1 hour before")}
                                >
                                    1 hour before
                                </div>
                                <div

                                    onClick={() => handleReminderClick("1 day before")}
                                >
                                    1 day before
                                </div>
                                <div
                                    onClick={() => handleReminderClick("1 week before")}
                                >
                                    1 week before
                                </div>
                            </div>
                        )}
                    </div>
                    <button className='popup-submit-button' onClick={handleSubmit}>submit</button>
                    <p className='error-message-text'>{errorMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default TaskPopup