import React,{useCallback,useState} from "react";
import CheckedBlue from "../assets/blue-checked.svg";
import AlarmClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";
import DeleteTask from "../componets/ui/DeleteTask"
import TagIcon from "../assets/red-tag.svg"
import StatusDropDown from "./StatusDropDown";



export default function TaskTile( { 
  task,
  onClick,
  fetchAllTasks,
  changeTaskStatus,
  setActiveTaskID,
  showEditTaskScreen,
  boardView,
}) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const handleEditTask = useCallback(
    (event) => {
      // In this case, this element and one of its ancestors (div with className `task-tile-container`)
      // have handlers for the same event (onClick). We don't want to fire the onClick handler on the parent.
      // So we stop event bubbling with `event.stopPropagation()`
      event.stopPropagation();
      setActiveTaskID(task._id);
      showEditTaskScreen();
    },
    [setActiveTaskID, showEditTaskScreen, task._id]
  );
  const handleDeleteTask = useCallback((event) => {
    event.stopPropagation();
    setShowDeleteTaskPopup(true);
  }, []);

  const closeDeleteTaskPopup = useCallback(
    () => setShowDeleteTaskPopup(false),
    []
  );

  return (
    <>
      <div className="task-tile-container cursor-pointer" onClick={onClick}>
        <div>
          <div className="flex">
            <span className="task-icon-wrapper">
              <img src={CheckedBlue} className="task-icon" alt="task icon" />
            </span>
            <div className="task-text-wrapper">
              <p className="tast-primary-text">{task?.title}</p>
              <p className="task-secondary-text">{task?.description}</p>
            </div>
          </div>
          {!boardView && task.labels.length ? (
            <span className="labels-icon-wrapper">
              <img src={TagIcon} alt="label icon" />
              <span className="labels-rows">
                {task.labels.map((label) => (
                  <span key={`${task._id}-${label}`}>{label}</span>
                ))}
              </span>
            </span>
          ) : null}
        </div>
        <div className="status-action-item">
          <div className="action-items-container">
            {/* status dropdown */}
            <StatusDropDown
              value={task.status}
              taskId={task._id}
              changeTaskStatus={changeTaskStatus}
            />

            {task?.due_date && (
              <div className="flex date-container">
                <img src={AlarmClock} alt="alarm clock" />
                <p className="date-text">
                  {moment(task?.due_date).format("DD MMM YYYY")}
                </p>
              </div>
            )}

            <div
              className="edit-container cursor-pointer"
              onClick={handleEditTask}
            >
              <img src={Edit} alt="Edit task Icon" />
            </div>

            <div
              className="delete-container cursor-pointer"
              onClick={handleDeleteTask}
            >
              <img src={Delete} alt="Edit task Icon" />
            </div>
          </div>
        </div>
        {boardView && task.labels.length ? (
          <span className="labels-icon-wrapper">
            <img src={TagIcon} alt="label icon" />
            <span className="labels-rows">
              {task.labels.map((label) => (
                <span key={`${task._id}-${label}`}>{label} </span>
              ))}
            </span>
          </span>
        ) : null}
      </div>
      <DeleteTask
        task={task}
        isOpen={showDeleteTaskPopup}
        onClose={closeDeleteTaskPopup}
        fetchAllTask={fetchAllTasks}
      />
    </>
  );
}

