import React from 'react'
import Modal from './ui/Modal'
import checkedBlue from "../assets/blue-checked.svg"
import Cross from "../assets/cross-icon.svg"
import AlarmClock from "../assets/alarm-clock.svg"
import Edit from "../assets/edit.svg"
import Delete from "../assets/delete.svg"
import moment from "moment";
import DeleteTask from "../componets/ui/DeleteTask";
import { useState } from "react";
import TagIcon from "../assets/red-tag.svg" 
import StatusDropDown from './StatusDropDown'
import LabelSelector from './LabelSelector'


export default function ViewTask({
  task,
  setActiveTaskId,
  fetchAllTasks,
  showEditTaskScreen,
  showTaskListScreen,
  changeTaskStatus,
}) {

const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

const [selectedLables, setSelectedLables] = useState(task?.labels || []);
// linked are linked active task


const handleEditTask = function(){
 setActiveTaskId(task._id);
showEditTaskScreen();
};

const openDeleteTaskPopup =() => setShowDeleteTaskPopup(true);
const closeDeleteTaskPopup = () => setShowDeleteTaskPopup(false);

return (
  <Modal isOpen={true} onClose={showTaskListScreen}>
    <div className="flex justify-between view-task-header">
      <div className="flex">
        <span className="task-icon-wrapper">
          <img src={checkedBlue} className="task-icon" alt="Task icon" />
        </span>
        <h2 className="view-task-title">{task.title}</h2>
      </div>
      <div className="flex items-center gap-2">
        <StatusDropDown
          value={task.status}
          taskId={task._id}
          changeTaskStatus={changeTaskStatus}
        />
        <div className="close-modal-btn" onClick={showTaskListScreen}>
          <img src={Cross} alt="Close popup icon" />
        </div>
      </div>
    </div>

    <div className="flex">
      <div className="view-task-left-section">
        <pre className="view-task-description">{task.description}</pre>
        {selectedLables.length ? (
          <span className="labels-icon-wrapper">
            <img src={TagIcon} alt="label-icon" />
            <span className="labels-row">
              {selectedLables.map((label) => (
                <span key={`${task._id}-${label}`}>{label}</span>
              ))}
            </span>
          </span>
        ) : null}
      </div>

      <div className="view-task-right-section">
        {task.due_date && (
          <div className="view-task-info-box">
            <p className="label-14">Due Date</p>
            <div className="flex date-container">
              <img src={AlarmClock} alt="clock-icon" />
              <p className="date-text">
                {moment(task.due_date).format("DD MM YYYY")}
              </p>
            </div>
          </div>
        )}

        <LabelSelector
          task={task}
          selectedLables={selectedLables}
          setSelectedLables={setSelectedLables}
        />

        <div className="view-task-info-box flex clickable" onClick={handleEditTask}>
          <img src={Edit} alt="edit task" width={16} height={16} />
          <p className="label-12">Edit Task</p>
        </div>

        <div className="view-task-info-box flex clickable" onClick={openDeleteTaskPopup}>
          <img src={Delete} alt="delete task" width={16} height={16} />
          <p className="label-12">Delete Task</p>
        </div>
      </div>
    </div>

    {showDeleteTaskPopup && (
      <DeleteTask
        isOpen={showDeleteTaskPopup}
        onClose={closeDeleteTaskPopup}
        task={task}
        fetchAllTasks={fetchAllTasks}
      />
    )}
  </Modal>
);
}