import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

const BASE_URL = 'https://safeguard-5cfr.onrender.com/api';
//   const BASE_URL = 'http://127.0.0.1:5002/api';

class ApiClient {
    private static instance: AxiosInstance;

    private constructor() {}

    private static getAccessToken(): string | undefined {
        return Cookies.get('access_token');
    }

    public static getAxiosInstance(): AxiosInstance {
        if (!this.instance) {
            const accessToken = this.getAccessToken();

            this.instance = axios.create({
                baseURL: BASE_URL,
                headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
            });

            this.instance.interceptors.response.use(
                (response: AxiosResponse) => response,
                (error: AxiosError) => {
                    if (error.response?.status === 401) {
                        console.error("Session expired. Please log in again.");
                        Cookies.remove('access_token');
                    }
                    return Promise.reject(error);
                }
            );
        }
        return this.instance;
    }
}

export default ApiClient;