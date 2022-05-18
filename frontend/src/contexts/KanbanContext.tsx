/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import { KanbanContextProps, CreatedTask, KanbanProviderProps, Task } from '../interfaces';
import { api } from '../utils';

export const KanbanContext = createContext({} as KanbanContextProps);

export const KanbanProvider = ({ children }: KanbanProviderProps) => {
    const [tasks, setTasks] = useState<CreatedTask[]>([]);

    const getTasks = async (): Promise<CreatedTask[]> => {
        const token = localStorage.getItem('token');
        const response = await api.get('/cards', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        const { data } = response as { data: CreatedTask[] };

        setTasks(data);
        return data;
    };

    const createTask = async (task: Task): Promise<CreatedTask> => {
        const token = localStorage.getItem('token');
        const response = await api.post('/cards', task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        if (response.status === 400) {
            throw new Error('Invalid task');
        }

        const { data } = response as { data: CreatedTask };

        setTasks([...tasks, data]);

        return data;
    };

    const updateTask = async (task: CreatedTask): Promise<CreatedTask> => {
        const token = localStorage.getItem('token');
        const response = await api.put(`/cards/${task.id}`, task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 400) {
            throw new Error('Invalid task');
        }

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        if (response.status === 404) {
            throw new Error('Task not found');
        }

        const { data } = response as { data: CreatedTask };

        setTasks(tasks.map((oldTask) => (oldTask.id === data.id ? data : oldTask)));

        return data;
    };

    const deleteTask = async (task: CreatedTask): Promise<CreatedTask[]> => {
        const token = localStorage.getItem('token');
        const response = await api.delete(`/cards/${task.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        if (response.status === 404) {
            throw new Error('Task not found');
        }

        const { data } = response as { data: CreatedTask[] };

        setTasks(data);

        return data;
    };

    return (
        <KanbanContext.Provider value={{ tasks, getTasks, createTask, updateTask, deleteTask }}>
            {children}
        </KanbanContext.Provider>
    );
};
