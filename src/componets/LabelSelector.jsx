import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    } from "react";
    import getLabelsAPI from "./api/getLabels";
    import updateLabelAPI from "./api/updateLabel";
    import BlueTag from "../assets/blue-tag-hollow.svg";
    import Cross from "../assets/cross-icon.svg";

export default function LabelSelector({
  task,
  selectedLabels,
  setSelectedLabels,
  placeholder = "type a label"
}) {
  const taskId = task._id;
  const [isOpen, setIsOpen] = useState(false);
  const [labels, setLabels] = useState([]); // all labels
  const [searchInput, setSearchInput] = useState("");
  const [matchingLabels, setMatchingLabels] = useState([]); // labels that match input

  const dropdownRef = useRef(null);

  const toggleSelector = useCallback(()=>setIsOpen((isOpen)=>!isOpen),[]);


  // wrapper over setMatching labels to ensure un slected labels get displayed

  const handelSetMatchingLables = useCallback(
    (matchingLabelsTOset)=>{
        const filteredLabels = matchingLabelsTOset.filter(
            (label)=> !selectedLabels.includes(label)
        );
        setMatchingLabels(filteredLabels);  
    },
    [selectedLabels]
    
  )

  //store all labels in state and display unselcted one

  const handelGetLabelResponse = useCallback((responseData)=>{
    setLabels(responseData.labels);
    handelSetMatchingLables(responseData.label);
  },[handelSetMatchingLables]);

  const handleError =useCallback((errormsg)=>{
    console.error(errormsg);
    alert(errormsg);
    setIsOpen(false)
  },[]);

//   intial useEffect 
useEffect(()=>{
    //handel closinng selecteor whn clcked out side
    const handleOutsideClick =(event)=>{
        if(dropdownRef.current && !dropdownRef.current.contains(event.target))
            setIsOpen(false);
    };
    document.addEventListener("mousedown",handleOutsideClick);

    //clean up fun
    return()=>{
        document.removeEventListener("mousedown",handleOutsideClick);
    }
},[])

// fetch all labels whn selecor opens 

useEffect(()=>{
    if(isOpen) getLabelsAPI(handelGetLabelResponse,handleError);
},[handleError,handelGetLabelResponse,isOpen]);

const handelUpdateResponse = useCallback(()=>{
    // fetch all labels again after ipdating active task in backend  labels are selected again if linked to anyother task 
    getLabelsAPI(handelGetLabelResponse,handleError);
},[handelGetLabelResponse,handleError]);



// effect fired when label is created,selected or deselected
useEffect(()=>{
    updateLabelAPI(selectedLabels,taskId,handelUpdateResponse,handleError);


},[selectedLabels,taskId,handelUpdateResponse,handleError])


const handleInputChange = useCallback((event)=>{
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    const matching = labels.filter(label=>label.toLowerCase());
    handelSetMatchingLables(matching);
},[handelSetMatchingLables,labels]);

const handleLabelSelect = useCallback(label=>{
    //check if label already selected
    if(!selectedLabels.includes(label)){
        setSelectedLabels(pervSelectedlabels =>[...pervSelectedlabels,label]);
    }
    setSearchInput("");
    handelSetMatchingLables([]);

},[handelSetMatchingLables,selectedLabels,setSelectedLabels]);

const handleLabelDeselect = useCallback((label) => {
    setSelectedLabels((prevSelectedLabels) =>
      prevSelectedLabels.filter((item) => item !== label)
    );
    setSearchInput("");
    handelSetMatchingLables([]);
  }, [setSelectedLabels, handelSetMatchingLables]);
  
  const handleCreateLabel = useCallback(() => {
    const newLabel = searchInput.trim();
    
    if (newLabel !== "" && !labels.includes(newLabel)) {
      setLabels((prevLabels) => [...prevLabels, newLabel]);
      setSelectedLabels((prevSelected) => [...prevSelected, newLabel]);
    }

    setSearchInput("");
    handelSetMatchingLables([]);
  }, [handelSetMatchingLables, labels, searchInput, setSelectedLabels, setLabels]);
  

  const isTyping = useMemo(()=>Boolean(searchInput.trim().length),[searchInput]);


  return (
    <div className="label-selector-container" ref={dropdownRef}>
      <div className="view-task-info-box clickable flex" onClick={toggleSelector}>
        <img src={BlueTag } alt="label-icon" />
        <p className="label-12">Labels</p>
      </div>
  
      {isOpen && (
        <div className="label-selector label-12">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder={placeholder}
          />
  
          <div className="labels-list-overflow">
            {!isTyping && (
              <ul className="selected-labels-list">
                {selectedLabels.map((label) => (
                  <li key={`${label}-selected`} className="selected-label">
                    <img src={BlueTag } width={13} height={13} alt="label-icon" />
                    <button onClick={() => handleLabelDeselect(label)}>
                      <img src={Cross} width={8} alt="deselect" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
  
            <ul className="matching-label-list">
              {matchingLabels.map((label) => (
                <li
                  key={`${label}-listed`}
                  onClick={() => handleLabelSelect(label)}
                  className="matching-label"
                >
                  <img src={BlueTag} width={13} height={13} alt="label-icon" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
  
          {isTyping && !labels.includes(searchInput) && (
            <button onClick={handleCreateLabel} className="create-label-btn">
                {" "}
              Create
            </button>
          )}
        </div>
      )}
    </div>
  );
}