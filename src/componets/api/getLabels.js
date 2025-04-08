async function getLabelsAPI(handleResponse, handleError) {
    try {
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
        const endpoint = "/api/v2/labels";
        const url = new URL(endpoint, baseUrl);

        const response = await fetch(url);

        if (!response.ok) {
            const errorMessage = jsonData.message || "Unknown error occurred";
            throw new Error(errorMessage);
        }

        const jsonData = await response.json();
        handleResponse(jsonData);
    } catch (error) {
        handleError(error);
    }
}

export default getLabelsAPI;
