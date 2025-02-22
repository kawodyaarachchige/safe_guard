
const API_BASE_URL = 'http://localhost:5002/api/incident/';


export const incidentApi = {
    saveIncident: async (data: Partial<Incident>): Promise<Incident> => {
        try {
            const response = await fetch(`${API_BASE_URL}/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Read error as text
                throw new Error(`Server Error: ${errorText}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json(); // Parse JSON response
            } else {
                const textResponse = await response.text();
                throw new Error(`Unexpected response format: ${textResponse}`);
            }

        } catch (error) {
            console.error("Error saving incident:", error);
            throw error;
        }
    },
    // Add this function to fetch incidents
    fetchIncidents: async (): Promise<Incident[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/all`);
            if (!response.ok) {
                const errorText = await response.text(); // Read error as text
                throw new Error(`Server Error: ${errorText}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json(); // Parse JSON response
            } else {
                const textResponse = await response.text();
                throw new Error(`Unexpected response format: ${textResponse}`);
            }
        } catch (error) {
            console.error("Error fetching incidents:", error);
            throw error;
        }
    },
};