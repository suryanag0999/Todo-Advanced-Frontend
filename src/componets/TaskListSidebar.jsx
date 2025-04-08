import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import List from "../assets/list-view.svg";
import Board from "../assets/board.svg";
import getLabelsAPI from "./api/getLabels";
import fetchTaskAPI from "./api/fetchTasks";
import CheckBox from "../componets/ui/CheckBox";
import DropdownSortBy from "./ui/DropdownSortBy";

const statusOptions = [
{
display: "Open",
value: "Open",
},
{
display: "In Progress",
value: "In-Progress",
},
{
display: "Completed",
value: "Completed",
},
];
const sortOptions = [
    { label: "Date Added", value: "added_on" },
    { label: "Due Date", value: "due_date" },
    ];

export default function TaskListSideBar({ boardView, setBoardView, setTasks }) {
const [labels, setLabels] = useState([]);
const [selectedLabels, setSelectedLabels] = useState([]);
const [selectedStatus, setSelectedStatus] = useState([]);
const [sortOption, setSortOption] = useState([]);

// fetch All labels
useEffect(() => {
const handleResponse = (responseData) => {
setLabels(responseData.labels);
};

const handleError = (errMsg) => {
alert(errMsg);
console.error(errMsg);
};

getLabelsAPI (handleResponse, handleError);
}, []);

// callback for handel section & deseclection of names

const selectStatus = useCallback(function (statusToAdd) {
setSelectedStatus((prevStatus) =>
    prevStatus.includes(statusToAdd) ? prevStatus : [...prevStatus, statusToAdd]
);
}, []);

const removeStatus = useCallback(function (statusToRemove) {
setSelectedStatus((prevStatus) =>
prevStatus.filter((status) => status != statusToRemove)
);
}, []);

const selectLabel = useCallback(function (labelToAdd) {
setSelectedLabels((prevLabels) =>
    prevLabels.includes(labelToAdd) ? prevLabels : [...prevLabels, labelToAdd]
);
}, []);

const removeLabel = useCallback(function (labelToRemove) {
setSelectedLabels((prevLabels) => prevLabels.filter((label) => label !== labelToRemove));
}, []);

const handleStatusCheckbox = (e, value) => {
if (e.target.checked) {
selectStatus(value);
} else {
removeStatus(value);
}
};

const handleLabelCheckBox = (e, value) => {
if (e.target.checked) {
selectLabel(value);
} else {
removeLabel(value);
}
};

const handleResponse = useCallback(
(responseData) => {
setTasks(responseData.data.task);
},
[setTasks]
);

const handleError = useCallback((errorMessage) => {
console.error(errorMessage);

}, []);

useEffect(() => {
const options = {
sortOption,
selectedStatus,
selectedLabels,
};
fetchTaskAPI(handleResponse, handleError, options);
}, [handleResponse, handleError, selectedStatus, selectedLabels, sortOption]);

const enableBoardView = useCallback(() => {
setBoardView(true);
}, [setBoardView]);

const enableListView = useCallback(() => {
setBoardView(false);
}, [setBoardView]);



return (
<aside className="task-list-left-section">
<div>
<p className="left-section-label">View</p>
<div className="view-toggle-container">
{/* list view toggle */}
<div
onClick={enableListView}
className={clsx("view-toggle", !boardView && "active-toggle")}
>
<img src={List } alt="List icon" />
<p className="list-label">List</p>
</div>

{/* board view Toggle */}
<div
onClick={enableBoardView}
className={clsx("view-toggle", boardView && "active-toggle")}
>
<img src={Board} alt="board Icon" />
<p className="list-label">Board</p>
</div>
</div>
</div>

<div className="task-sidebar-child-section">
<p className="left-section-lebel">Task Status</p>
{/* render checkboxes for each status option */}
{statusOptions.map((status) => {
const handleClick = (e) => handleStatusCheckbox(e, status.value);
return (
<CheckBox
key={status.value + "-checkbox"}
label={status.display}
onClick={handleClick}
/>
);
})}
</div>

{/* sort by section */}
<div className="task-sidebar-child-section">
<p className="left-section">Sort By</p>
{/* Dropdown for sorting option */}
<DropdownSortBy
placeholder="Select"
value={sortOption}
onChange={setSortOption}
options={sortOptions}
/>
</div>
{/* label section */}
<div className="task-sidebar-child-section">
<p className="left-section-label">Label</p>
{!labels.length && (
<span className="no-label-text">No Label created yet</span>
)}

{/* render checkboxes for each label */}
{labels.map((label) => {
const handleClick = (e) => handleLabelCheckBox(e, label);
return <CheckBox key={label} label={label} onClick={handleClick} />;
})}
</div>
</aside>
);
}