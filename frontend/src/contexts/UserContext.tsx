import axios from 'axios';
import { createContext, useState } from 'react';
import { LoginResponseData, UserContextProps, UserProviderProps } from '../interfaces';
import { CreatedTask, Task } from '../interfaces/Task';

const apiUrl = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibGV0c2NvZGUiLCJpYXQiOjE2NTI3MzcwNTcsImV4cCI6MTY1MjgyMzQ1N30.lPpNJyxGtuHii6pQjl7M4_UtL3TrfrTjDq94v-WMryw';
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState<CreatedTask[]>([]);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        const response = await apiUrl.post('/auth/login', {
            username,
            password
        });

        const { data, status } = response as LoginResponseData;

        if (status === 401) {
            throw new Error('Invalid credentials');
        }

        // setToken(data);
        localStorage.setItem('token', data);
        setIsLoading(false);
    };

    const logout = () => {
        // setToken('');
        localStorage.removeItem('token');
    };

    const isLoggedIn = async () => {
        setIsLoading(true);
        const response = await apiUrl.get('/cards', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setIsLoading(false);

        return response.status === 200;
    };

    const getTasks = async () => {
        setIsLoading(true);

        const response = await apiUrl.get('/cards', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { data, status } = response;

        if (status !== 200) {
            return undefined;
        }

        setIsLoading(false);
        setTasks(data);

        return data as CreatedTask[];
    };

    const createTask = async (task: Task) => {
        setIsLoading(true);

        const response = await apiUrl.post('/cards', task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { data, status } = response;

        if (status !== 201) {
            return undefined;
        }

        getTasks();
        setIsLoading(false);

        return data as CreatedTask;
    };

    const deleteTask = async (id: string) => {
        setIsLoading(true);

        const response = await apiUrl.delete(`/cards/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { data, status } = response;

        if (status !== 200) {
            return undefined;
        }

        getTasks();
        setIsLoading(false);

        return data as CreatedTask[];
    };

    const updateTask = async ({ id, conteudo, lista, titulo }: CreatedTask) => {
        setIsLoading(true);

        const response = await apiUrl.put(
            `/cards/${id}`,
            {
                conteudo,
                lista,
                titulo,
                id
            } as CreatedTask,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const { data, status } = response;

        if (status !== 200) {
            return undefined;
        }

        getTasks();
        setIsLoading(false);

        return data as CreatedTask;
    };

    return (
        <UserContext.Provider
            value={{
                login,
                isLoggedIn,
                logout,
                isLoading,
                createTask,
                deleteTask,
                getTasks,
                updateTask,
                tasks
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
