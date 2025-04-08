import React from "react";
import UserIcon from "../assets/user-icon.png";
import FolderWhite from "../assets/folder-white.svg";

export default function NoTask({showCreateTaskScreen}) {
  return (
    <div className="flex flex-col items-center justify-center content-section">
      <div className="content-selection-container flex flex-col justify-center">
        <img src={UserIcon} alt="User with no pending tasks" loading="lazy" />
        <h1 className="no-task-primary-text">Woohoo,you're all done!</h1>
        <p className="no-task-secondary-text">
          {" "}
          There are no tasks added yet. Click to add a new task
        </p>
        <button onClick={showCreateTaskScreen} className="btn btn-purple create-task-btn">
          <img src={FolderWhite} alt="Create task item" /> Create New Task
        </button>
      </div>
    </div>
  );
}
