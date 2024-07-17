import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

class AuthService {
    async login(username, password) {
        const response = await axios.post(`${API_URL}/auth`, { email: username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('token');
    }

    async register(firstName, lastName, email, password, role) {
        return axios.post(`${API_URL}/users`, {
            firstName,
            lastName,
            email,
            password,
            role
        });
    }
}

export default new AuthService();