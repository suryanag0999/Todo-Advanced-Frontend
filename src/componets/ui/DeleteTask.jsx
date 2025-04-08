import React, { useState } from "react";
import Modal from "./Modal";
import Info from "../../assets/info.svg";
import Cross from "../../assets/cross-icon.svg";
import clsx from "clsx";
import { useCallback } from "react";
import deleteTaskAPI from "../api/deleteTask";

export default function DeleteTask({ isOpen, onClose, task, fetchAllTasks }) {
const [loading, setLoading] = useState(false);


const handleResponse = useCallback(
    function () {
      fetchAllTasks();
      onClose();
    },
    [fetchAllTasks, onClose]
  );

  const handleError = useCallback(function (errorMsg) {
    console.error(errorMsg);
    alert(errorMsg);
  }, []);

const deleteTask = useCallback(
    function () {
      deleteTaskAPI(task._id, handleResponse, handleError, setLoading);
    },
    [handleError, handleResponse, task._id]
  );

return(
 <Modal isOpen={isOpen} onClose={onClose}>
    <div className='delete-task-container'>
        <div className="text-right delete-task-header">
            <img src={Info} alt="info-icon" className='delete-popup-info-icon' />
            <div className='close-modal-btn'>
                <img src={Cross} alt="cross popup icon" onClick={onClose}/>
            </div>
        </div>
        <div className="delete-popup-contnet">
            <p className='delete-task-text'>
                are u sure u want delete<br/>
                <span className='delete-task-title'>{task.title}</span>
            </p>

            <div className="delete-action-btns">
            <button className="btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className={clsx(
                "btn",
                "delete-btn",
                loading && "disabled-delete-btn"
              )}
              onClick={deleteTask}
              disabled={loading}
            >
              {loading ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
    </div>

    </Modal>
)
}
