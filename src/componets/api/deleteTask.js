async function deleteTaskAPI(taskId, handleResponse, handleError, setLoading) {
    setLoading(true);
    try {
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const endpoint = "/task/" + taskId;
  
      const url = new URL (endpoint,baseUrl);
  
      // Send a DELETE request to the constructed URL to delete the task
      const response = await fetch(url, {
        method: "DELETE",
      });
  
      const jsonData = await response.json();
  
      // Check if the response is not successful
      if (!response.ok) {
        const errorMessage = jsonData.message || "Unknown error occurred";
        throw new Error(errorMessage);
      }
  
      handleResponse(jsonData);
    } catch (error) {
        const errorMessage= error.response?.data?.message||error.message||"unkown error";
      handleError(new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  }
  
  export default deleteTaskAPI;
  