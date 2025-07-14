import axios from 'axios';
import Cookies from 'js-cookie';
import {AuthDto, Item} from "@/app/lib/zodSchema";
import { User} from "@/app/utils/types";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
});

export const login = async (dto: AuthDto): Promise<{ accessToken: string }> => {
    const res = await api.post('/auth/login', dto);
    Cookies.set('accessToken', res.data.accessToken);
    return res.data;
};

export const register = async (dto: AuthDto): Promise<User> => {
    const res = await api.post('/auth/register', dto);
    return res.data;
};

export const refresh = async (): Promise<{ accessToken: string }> => {
    const res = await api.post('/auth/refresh');
    return res.data;
};

export const logout = async (): Promise<{ message: string }> => {
    const res = await api.post('/auth/logout', { withCredentials: true });
    Cookies.remove('accessToken');
    return res.data;
};

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get('/users');
    return res.data;
}

export const createItem = async(dto: Item) => {
    const res = await api.post('/items/create', dto);
    return res.data;
}

export const getAllItems = async (): Promise<Item[]> => {
    const res = await api.get<Item[]>('/items');
    return res.data;
}

export const getItem = async(id: string) => {
    const res = await api.get<Item>(`/items/${id}`);
    return res.data;
}

//настройка axios при каждом запросе к серверу передаем токен взятый из куки в заголовке Authorization
api.interceptors.request.use((config) => {
    const accessToken: string | undefined = Cookies.get('accessToken');
    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

//проверка токена
//если токен закончился получаем 401
api.interceptors.response.use(
    (res) => res, //если ок, возвращаем все хорошо
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const data = await refresh();  // вызывается функция для обновления токена
                Cookies.set('accessToken', data.accessToken);// сохраняем новый токен
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`; // вставляем новый токен в заголовок
                return api(originalRequest);// повторяем оригинальный запрос
            } catch (refreshError) {
                await logout(); // вызывается logout (например, удаляет токены, сессии и т.п.)
                window.location.href = '/login'; // редирект на страницу логина
                return Promise.reject(refreshError); // пробрасываем ошибку дальше
            }
        }
        return Promise.reject(error);
    }
);
