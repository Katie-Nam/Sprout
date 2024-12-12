import React from 'react';
import errorIcon from '../../../static/error_icon.png';

type Props = {
    deleteID : number | null;
    setDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteConfirmationPopup = ({deleteID, setDeleteVisible}: Props) => {
    const handleDeleteOk = async () => {
        /*
            this function handles delete with the given task id
        */
        try {
            const response = await fetch('http://localhost:5001/api/delete-task/' + deleteID, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
    
            const result = await response.json();
            if (!response.ok) {
                console.log("ERROR: Failed to delete task with ID", deleteID);
                
            }
            } catch (error) {
            console.error('Error fetching task data:', error);
            }
        setDeleteVisible(false);

    }
    return (
        <div className='popup-background'>
            <div className="popup-container delete-popup">
                <img src={errorIcon} alt="warning icon" />
                <h3>delete this task?</h3>
                <div className="button-container">
                    <button className='delete-button ok' onClick={handleDeleteOk}>ok</button>
                    <button className='delete-button cancel' onClick={() => setDeleteVisible(false)}>cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationPopup