const API_BASE_URL = 'http://localhost:5002/api/user/';

export const userApi = {
    login: async (email: string, password: string): Promise<User> => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        });
        if (!response.ok) throw new Error('Invalid credentials');
        return response.json();
    },

    signup: async (name: string, email: string, password: string): Promise<User> => {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password}),
        });
        if (!response.ok) throw new Error('Failed to create account');
        return response.json();
    },
}


