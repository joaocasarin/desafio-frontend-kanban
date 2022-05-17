/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import { KanbanContextProps, CreatedTask, KanbanProviderProps } from '../interfaces';
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

        const { data } = response;

        setTasks(data);

        console.log(data);

        return (data as CreatedTask[]) || ([] as CreatedTask[]);
    };

    return <KanbanContext.Provider value={{ tasks, getTasks }}>{children}</KanbanContext.Provider>;
};
