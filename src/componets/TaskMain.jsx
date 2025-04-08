import { useCallback, useEffect, useMemo, useState } from "react";
import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
// import Delete from "./ui/DeleteTask.jsx";
import Loading from "./ui/Loading";
import fetchTasksAPI from "../componets/api/fetchTasks.js";


export default function TaskMain() {
  //We manage current screen/routing through state in a single page application
  const [currComponent, setCurrComponent] = useState("loading");
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState("");
  const [boardView, setBoardView] = useState(false);
  
  console.log(tasks);
  
  //Memoized derived Computation
  const activeTask = useMemo(
  () => tasks.find((task) => task._id === activeTaskId),
  [tasks, activeTaskId]
  );
  
  const showNoTaskScreen = useCallback(function () {
  setCurrComponent("noTask");
  }, []);
  
  const showTaskListScreen = useCallback(function () {
  setCurrComponent("taskList");
  }, []);
  
  const showCreateTaskScreen = useCallback(function () {
  setCurrComponent("createTask");
  }, []);
  
  const showEditTaskScreen = useCallback(function () {
  setCurrComponent("editTask");
  }, []);
  
  const showViewTaskScreen = useCallback(function () {
  setCurrComponent("viewTask");
  }, []);
  
  const handleResponse = useCallback(
  function (responseData) {
  const extractedTasks = responseData.tasks;
  setTasks(extractedTasks);
  
  if (extractedTasks.length) {
  showTaskListScreen();
  } else {
  showNoTaskScreen();
  }
  },
  [showTaskListScreen, showNoTaskScreen]
  );
  
  const handleError = useCallback((errorMessage) => {
  alert(errorMessage);
  console.error(errorMessage);
  }, []);
  
  const fetchAllTasks = useCallback(
  function () {
    fetchTasksAPI(handleResponse, handleError);
  },
  [handleResponse, handleError]
  );
  
  //Intial Effect
  
  useEffect(() => {
  fetchAllTasks();
  }, [fetchAllTasks]);
  
  const changeTaskStatus = useCallback(function (status, taskId) {
  //Update the tasks state using the setTask setter function
  setTasks((prevTasks) => {
  return prevTasks.map((task) => {
  if (task._id === taskId) {return { ...task, status };
  }
  return task
  });
  });
  }, []);
  
  return (
  <>
  {currComponent === "loading" && <Loading />}
  
  <div id="container-div">
  {currComponent === "noTask" && (
  <NoTask showCreateTaskScreen={showCreateTaskScreen} />
  )}
  {currComponent === "taskList" && (
  <TaskList
  tasks={tasks}
  fetchAllTasks={fetchAllTasks}
  showViewTaskScreen={showViewTaskScreen}
  showEditTaskScreen={showEditTaskScreen}
  showCreateTaskScreen={showCreateTaskScreen}
  setActiveTaskId={setActiveTaskId}
  setTasks={setTasks}
  changeTaskStatus={changeTaskStatus}
  boardView={boardView}
  setBoardView={setBoardView}
  />
  )}
  {currComponent === "createTask" && (
  <CreateTask
  showTaskListScreen={showTaskListScreen}
  fetchAllTasks={fetchAllTasks}
  />
  )}
 {currComponent === "viewTask" && (
  <ViewTask
  task={activeTask}
  setActiveTaskId={setActiveTaskId}
  fetchAllTasks={fetchAllTasks}
  showEditTaskScreen={showEditTaskScreen}
  showTaskListScreen={showTaskListScreen}
  changeTaskStatus={changeTaskStatus}
  />
  )}
  {currComponent === "editTask" && (
  <EditTask
  task={activeTask}
  fetchAllTasks={fetchAllTasks}
  showTaskListScreen={showTaskListScreen}
  />
  )} 
  </div>
  </>
  );
  }