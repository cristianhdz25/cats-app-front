import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseURL = "https://catapi20250222210437-h5fgabezf9feb7bp.eastus-01.azurewebsites.net/api/Auth";

// Function to log in the user
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${baseURL}/login`, { username, password });

        const token = response.data.token; 

        cookies.set('jwtToken', token, { path: '/', maxAge: 3600 }); // max age in seconds (1 hour)

        return token;

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

// Function to register the user
export const register = async (username, password) => {
    try {
        const response = await axios.post(`${baseURL}/register`, { username, password });

         console.log(response.data);    

         return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}


