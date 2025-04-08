import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ArrowDown from "../../assets/arrow-down.svg"

export default function DropdownSortBy({ value, onChange, options, placeholder }) {
    // State to manage menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //refernce to select elemnt
    const selectRef = useRef(null); 
  
    // Toggle menu display
    const toggleMenuDisplay = useCallback(() => {
      setIsMenuOpen((prev) => !prev);
    }, []);
  
    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
          if (selectRef.current && !selectRef.current.contains(e.target)) {
            setIsMenuOpen(false);
          }
        }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);;
  
    // Handler for option change
   const handleOptionChange = useCallback(
       function (option) {
         onChange(option);
         setIsMenuOpen(false);
       },
       [onChange]
     );
   
  
    // Memoized selected option
   const selectedOption = useMemo(
      () => options.find((option) => option.value === value),
      [options, value]
    );
  
  
    return (
        <div ref={selectRef} className="dropdown-container">
          <div className="value-container" onClick={toggleMenuDisplay}>
            <span
              className={clsx("dropdown-value", !value && "dropdown-placeholder")}
            >
              {selectedOption?.label ?? placeholder}
            </span>
            <img src={ArrowDown} alt="dropdown Icon" />
          </div>
          {isMenuOpen && (
            <div className="menu-list">
              {options.map((option) => {
                return (
                  <div
                    className="menu-list-option"
                    key={option.value + "-option"}
                    onClick={() => handleOptionChange(option.value)}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          )}
          {/* <div className="menu-list">
            <div className="menu-list-option">Due Date</div>
          </div> */}
        </div>
      );
    }
    