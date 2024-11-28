import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3001';

const API_BASE_URL = 'https://api.umarketplace.cl';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Añadir token JWT automáticamente
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const login = async (email: string, password: string): Promise<any> => {
    const response = await api.post("/students/login", { email, password });
    const { access_token, studentId } = response.data;
  
    sessionStorage.setItem("token", access_token);
    sessionStorage.setItem("studentId", studentId); 
  
    return response.data;
  };
  
export const register = async (data: {
    name: string;
    email: string;
    password: string;
    career: string;
    campus: string;
    phone: string;
}) => {
    const response = await api.post('/students/register', data);
    return response.data;
};

export const getProfile = async () => {
    try {
      const response = await api.get('/students/profile');
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  };
  
export default api;
