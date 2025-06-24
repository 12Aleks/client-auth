import axios from 'axios';
import Cookies from 'js-cookie';
import {AuthDto} from "@/app/lib/zodSchema";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export const login = async (dto: AuthDto) => {

    const res = await api.post('/auth/login', dto);
    Cookies.set('accessToken', res.data.accessToken);
    return res.data;
};

export const register = async (dto: AuthDto) => {
    const res = await api.post('/auth/register', dto);
    return res.data;
};

export const refresh = async () => {
    const res = await api.post('/auth/refresh');
    return res.data;
};

export const logout = async () => {
    const res = await api.post('/auth/logout');
    Cookies.remove('accessToken');
    return res.data;
};

api.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const data = await refresh();
                Cookies.set('accessToken', data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                await logout();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

