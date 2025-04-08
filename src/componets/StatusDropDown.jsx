import clsx from "clsx";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import changeStatusAPI from"../componets/api/chnageStatus";
import DropDown from "../assets/white-down-arrow.svg"
const options = [
    {
      display: "Open",
      value: "Open",
      className: "status-open",
    },
    {
      display: "In Progress",
      value: "In-Progress",
      className: "status-in-progress",
    },
    {
      display: "Completed",
      value: "Completed",
      className: "status-completed",
    },
  ];

export default function StatusDropDown({
value = options[0].value,
taskId,
changeTaskStatus,
}) {

const [loading, setLoading] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef(null);

const currentStatus = useMemo(
    () => options.find((option) => option.value === value),
    [value]
  );

   useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = useCallback(
    (e) => {
      e.stopPropagation();
      setIsOpen(isOpen => !isOpen);
    },
    [setIsOpen]
  );

  const handleResponse = useCallback(
    (responseData) => {
      const { task } = responseData;
      // change status in local state
      changeTaskStatus(task._id, task.status);
    },
    [changeTaskStatus]
  );

  const handleError = useCallback((errorMessage) => {
    console.error(errorMessage);
    alert(errorMessage);
  }, []);

  const handleStatusChange = useCallback(
    (newValue) => {
      if (newValue !== value)
        changeStatusAPI(
          newValue,
          taskId,
          handleResponse,
          handleError,
          setLoading
        );
      setIsOpen(false);
    },
    [handleError, handleResponse, setIsOpen, taskId, value]
  );

  const handleOptionClick = useCallback(
    (e, value) => {
      e.stopPropagation();
      handleStatusChange(value);
    },
    [handleStatusChange]
  );


  return (
    <div ref={dropdownRef} className="status-dropdown">
      <button
        type="button"
        className={clsx("status-btn", currentStatus.className)}
        disabled={loading}
        onClick={toggleDropdown}
      >
        {currentStatus.display}
        {!loading && <img src={DropDown} />}
      </button>
      
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((item) => {
            const handleClick = (e) => {
              handleOptionClick(e, item.value);
            };
            return (
              <li
                key={item.value}
                className="dropdown-item"
                onClick={handleClick}
              >
                {item.display}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}