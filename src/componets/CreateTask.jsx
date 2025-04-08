import React,{useState,useCallback} from "react";
import UserIcon from "../assets/user-icon.png";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import Calendar from "../assets/calendar.svg";
import InputField from "./ui/InputField";
import clsx from "clsx";
import createTaskAPI from"../componets/api/CreateTask.js"


export default function CreateTask({showCreateTaskScreen,fetchAllTasks}) {
// Below 3 states are related to task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState();


  const [loading, setLoading] = useState(false);

  const handleTitleChange = useCallback(function (event) {
        setTaskTitle(event.target.value);
      }, []);
    
  const handleDescriptionChange = useCallback(function (event) {
        setTaskDescription(event.target.value);
      }, []);
  const handleDateChange = useCallback(function (date) {
        setTaskDueDate(date);
      }, []);

      const validate = useCallback(function (values) {
        const { taskTitle, taskDescription } = values;
       
        if (taskTitle && taskDescription) {
          // Valid
          return true;
        } else {
          // Invalid
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


      
      const createNewTask = useCallback(
        function (values) {
          createTaskAPI(values, handleResponse, handleError, setLoading);
        },
        [handleError, handleResponse]
      );

      const handleAddTask = useCallback(() => {
        const values = {
          taskTitle,
          taskDueDate,
          taskDescription,
        };
        const isValid = validate(values);
        if (isValid) createNewTask(values);
      }, [createNewTask, taskDescription, taskDueDate, taskTitle, validate]);
    

    return (
    <div className="content-section create-task-section">
    <div className="create-task-card">
    <img src={UserIcon} alt="" width={263} />
    <h1 className="create-task-title-text">Create New Task</h1>
    <InputField
    name={"new-task-title"}
    value={taskTitle}
    onChange={handleTitleChange}
    label={"Title"}
    type={"text"}
    inputImg={TitleImg}
    placeHolder={"Title"}
    />
    <InputField
    name="new-task-description"
    value={taskDescription}
    onChange={handleDescriptionChange}
    label="description"
    type="textarea"
    inputImg={Memo}
    placeHolder={"Description"}
    className={"input-margin"}
    />
    
    <InputField
          name="new-task-due-date"
          label="Due Date"
          type="date"
          value={taskDueDate}
          onChange={handleDateChange}
          inputImg={Calendar}
          placeholder="Due Date"
          className="input-margin"
        />
    
    <div className="add-edit-task-btns">
          <button
            className={clsx(
              "btn",
              "add-task-btn",
              loading ? "disabled-add-task-btn" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleAddTask}
          >
            {loading ? "Adding Task" : "Add Task"}
          </button>
          <button
            className="btn cancel-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            Cancel
          </button>
        </div>
    </div>
    </div>
    );
    }
    
    