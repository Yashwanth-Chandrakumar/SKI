import axios from 'axios';

const baseURL = 'http://localhost:3000/';
const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
const UserData = (email) => axiosInstance.get(`/users/email/${email}`);
const SignUp = (email, password) => axiosInstance.post('/auth/register', { email, password });


//Admin
const getAllUsers = () => axiosInstance.get('/users/all')

export { axiosInstance, SignUp,UserData};