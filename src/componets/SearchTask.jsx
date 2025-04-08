import React, { useCallback, useEffect, useRef } from 'react'
import search from "../assets/search.svg"

export default function SearchTask({placeholder="Search title and description", 
    tasks,
    setFilteredTask,
    searchQuery,
    setSearchQuery,
}) {

const timerIdRef = useRef(null);

 useEffect(()=>{
    //perform sreach logic and filter based on sreach query
    const filteredTasks = tasks.filter((task)=>{
        const case1 = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
        const case2 = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

        return case1 || case2;
    });
    setFilteredTask(filteredTasks)
 },[searchQuery,setFilteredTask,tasks]);

 //debounce search input change
 const handleSearchInputChange = useCallback((event) => {
    const query = event.target.value;
      // Clear the previous timeout
      clearTimeout(timerIdRef.current);
    // Set a new timeout and update the ref
    timerIdRef.current = setTimeout(() => {
        setSearchQuery(query);
    }, 300);
}, [setSearchQuery]);

 

  return (
    <div className='search-box-container'>
        <input type="text" placeholder={placeholder}
        onChange={handleSearchInputChange} />
        <img src={search} alt="search-icon" />
    </div>
  )
}
