import React from "react";
import EditTaskImg from "../assets/edit-task-logo.svg";
import InputField from "./ui/InputField";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import Calender from "../assets/calendar.svg";
import clsx from "clsx";
import { useCallback, useState } from "react";
import updateTaskAPI from "../componets/api/updateTask.js";

export default function EditTask({ task, fetchAllTasks, showTaskListScreen }) {
  const [taskTitle, setTaskTitle] = useState(task.title ?? "");
  const [taskDescription, setTaskDescription] = useState(
    task.description ?? ""
  );

  const [taskDueDate, setTaskDueDate] = useState(
    task.due_date ? new Date(task.due_date) : undefined
  );

  const [loading, setLoading] = useState(false);

  const handleTitleChange = useCallback(function (e) {
    setTaskTitle(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback(function (e) {
    setTaskDescription(e.target.value);
  }, []);

  const handleDateChange = useCallback(function (date) {
    setTaskDueDate(date);
  }, []);

  // copied from create task for validation
  const validate = useCallback(function (values) {
    const { taskTitle, taskDescription } = values;
    if (taskTitle && taskDescription) {
      // Valid
      return true;
    } else {
      // inValid
      const errorMsg = "Please fill out the title and description.";
      console.error(errorMsg);
      alert(errorMsg);
      return false;
    }
  }, []);

  const handleResponse = useCallback(
    function (responseData) {
      if (responseData.success) {
        console.log("handled successfully");
        fetchAllTasks();
      }
    },
    [fetchAllTasks] // Dependency array
  );

  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.error(errorMsg);
  }, []);
  
  const editTask = useCallback(
    function (taskId, values) {
      updateTaskAPI(values, taskId, handleResponse, handleError, setLoading);
    },
    [handleError, handleResponse]
  );

  const handleEditTask = useCallback(() => {
    const values = {
      taskTitle,
      taskDueDate,
      taskDescription,
    };
    const isValid = validate(values);
    if (isValid) editTask(task._id, values);
  }, [editTask, task._id, taskDescription, taskDueDate, taskTitle, validate]);

  return (
    <div className="create-task-section">
      <div className="create-task-card">
        <img src={EditTaskImg} alt="edit task" width={263} />
        <h1 className="create-task-title-text">Edit Task</h1>
        <InputField
          name="edit-task-title"
          value={taskTitle}
          onChange={handleTitleChange}
          label="Title"
          type="text"
          inputImg={TitleImg}
          placeholder="Title"
        />

        <InputField
          name="edit-task-description"
          value={taskDescription}
          onChange={handleDescriptionChange}
          label="Description"
          type="textarea"
          inputImg={Memo}
          placeholder="Description"
          className="input-margin"
        />

        <InputField
          name="edit-task-due-date"
          label="Due Date"
          type="date"
          value={taskDueDate}
          onChange={handleDateChange}
          inputImg={Calender}
          placeholder="Due Date"
          className="input-margin"
        />

        <div className="add-edit-task-btns">
          <button
            className={clsx(
              "btn",
              "edit-task-btn",
              loading ? "disabled-delete-btn" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleEditTask}
          >
            {loading ? "Saving" : "Save"}
          </button>
          <button
            className="btn cancel-btn cursor-pointer"
            onClick={showTaskListScreen}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
