import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Create an axios instance
const apiService = axios.create({
    baseURL: 'https://catapi20250222210437-h5fgabezf9feb7bp.eastus-01.azurewebsites.net/api/Cat/', // Base URL of the API
});

// Interceptor to add the Authorization header 
apiService.interceptors.request.use((config) => {
    const token = cookies.get('jwtToken');

    console.log('token', token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiService;