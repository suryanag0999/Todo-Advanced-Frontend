async function createTaskAPI(values, handleResponse, handleError, setLoading) {
    setLoading(true);
    try {
       const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
       const endpoint = "/task"; // No leading '/'
       const url = new URL (endpoint,baseUrl);
       
    // Construct the request body with the values provided
    const requestBody = JSON.stringify({
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });

      // Send a POST request to the constructed URL to create the task
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      
      //handel data coming from fetch
      const jsonData = await response.json();
      if (!response.ok) {
        const errorMessage = jsonData.message || "Unknown error occurred";
        throw new Error(errorMessage);
      }

        
      handleResponse(jsonData);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  } 
export default createTaskAPI;