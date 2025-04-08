import React, { useCallback, useMemo, useState } from 'react';
import TaskTile from './TaskTile';
import folderImg from '../assets/folder-white.svg';
import clsx from 'clsx';
import TaskListSidebar from './TaskListSidebar';
import SearchTask from './SearchTask';

export default function TaskList({
  tasks = [],
  fetchAllTasks,
  showViewTaskScreen,
  showEditTaskScreen,
  showCreateTaskScreen,
  setActiveTaskId,
  setTasks,
  changeTaskStatus,
  boardView,
  setBoardView,
}) {

  const [searchQuery,setSearchQuery] = useState("");
  const [filteredTasks,setFilteredTask] = useState([]);


  const handleViewTask = useCallback((taskId) => {
    setActiveTaskId(taskId);
    showViewTaskScreen();
  }, [  setActiveTaskId, showViewTaskScreen]);

  // check user has cheked anything 

  const showSearchResults = useMemo(()=> Boolean(searchQuery.trim().length),
[searchQuery]);
  

  return (
    <div className='task-list-screen content-section'>
      {/* Left Sidebar */}
      <div className='task-list-left-container'>
        <p className='task-heading'>🔥 Task</p>
        {/* task Sidebar  */}
        <TaskListSidebar
          boardView={boardView}
          setBoardView={setBoardView}
          setTasks={setTasks}
        />
      </div>
  
      {/* Right Container */}
      <div className='task-list-right-container'>
        {/* Header with Search and Add Task Button */}
        <div className='task-list-right-header '>
          {/* sreachbar  */}
          <SearchTask  placeholder="Search title and description" tasks={tasks}
          setFilteredTask={setFilteredTask}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}/>

          <button onClick={showCreateTaskScreen} className=
          "add-task-btn cursor-pointer">
            <img src={folderImg} alt='add task icon' /> add new task
          </button>
        </div>
  
        {/* Task List Section */}
        <div className={clsx('task-list-right-section', boardView && 'board-view')}>
          {(showSearchResults ? filteredTasks:tasks).map((task) => (
            <TaskTile
              key={`${task._id}-${showSearchResults ? "result-tile":"task-tile"}`}
              task={task}
              onClick={() => handleViewTask(task._id)}
              fetchAllTasks={fetchAllTasks}
              changeTaskStatus={changeTaskStatus}
              setActiveTaskID={  setActiveTaskId}
              showEditTaskScreen={showEditTaskScreen}
              boardView={boardView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
