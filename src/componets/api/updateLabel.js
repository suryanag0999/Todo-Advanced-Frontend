async function updateLabelApi(Labels, taskId, handleResponse, handleError) {
    try {
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
        const endpoint = `/api/v2/task${taskId}/labels`;
        const url = new URL(endpoint, baseUrl);
        const requestBody = JSON.stringify(Labels);

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody
        });

        const jsonData = await response.json();

        if (!response.ok) { 
            const errorMessage = jsonData.message || "Unknown error occurred";
            throw new Error(errorMessage);
        }
        
        handleResponse(jsonData); 
    } catch (error) {
        handleError(error);
    }
}

export default updateLabelApi;
