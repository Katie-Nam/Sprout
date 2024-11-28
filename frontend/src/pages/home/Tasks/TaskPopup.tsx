import React, { useState } from 'react';
import './Tasks.css';
import closeImg from '../../../static/cancel_icon.png';
import addImg from '../../../static/add_icon.png';
import dropdownImg from '../../../static/dropdown_icon.png';

type Props = {
    isAdd ?: boolean;
    setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskPopup = ({isAdd, setPopupVisible}: Props) => {
    const [description, setDescription] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [dueDate, setDueDate] = useState<string>("");
    const [newTag, setNewTag] = useState<string>("");
    const [tagColors, setTagColors] = useState<{ [key: string]: string }>({
        inf133: "brown",
        inf132: "green"
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
    const [priority, setPriority] = useState<string>("medium");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleReminderClick = (option: string) => {
        setSelectedReminder(option);
        setIsOpen(false); // Close the dropdown after selecting an option
    };
    

    const selectTag = (tag: string) => {
        if (selectedTag === tag) {
            setSelectedTag(null); // Deselect the tag if it's double-clicked
        }
        else{
            setSelectedTag(tag);
        }
        
    };
    
    
    const handleAddNewTag = () => {
        if (newTag.trim() && !tagColors[newTag]) {
            // Add the new tag to the state
            setTagColors({
                ...tagColors,
                [newTag]: "gray" // Default color for new tags
            });
            setSelectedTag(newTag); // Select the newly added tag
            setNewTag(""); // Clear the input
        }
    };

    const handleSubmit = () => {
        // description, due date
        console.log(description, dueDate, selectedTag, priority);
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
                            <input type="radio" id="low-priority" name="priority" value="low" onChange={(e) => setPriority(e.target.value)}/>
                        </div>
                        <div className="radio-button">
                            <label htmlFor="medium-priority">medium</label>
                            <input type="radio" id="medium-priority" name="priority" value="medium" onChange={(e) => setPriority(e.target.value)}/>
                        </div>
                        <div className="radio-button">
                            <label htmlFor="high-priority">high</label>
                            <input type="radio" id="high-priority" name="priority" value="high" onChange={(e) => setPriority(e.target.value)}/>
                        </div>
                    </form>
                    <label htmlFor="tags">tags *</label>
                    <div className='popup-encapsulating-tags-container'>
                        <div className="existing-tag-container">
                            {Object.keys(tagColors).map((tag) => (
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
                            Object.keys(tagColors).length <= 4 && (
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