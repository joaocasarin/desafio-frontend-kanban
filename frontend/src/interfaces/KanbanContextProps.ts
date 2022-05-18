import { ReactNode } from 'react';
import { CreatedTask, Task } from './Task';

export interface KanbanContextProps {
    tasks: CreatedTask[];
    getTasks: () => Promise<CreatedTask[]>;
    createTask: (task: Task) => Promise<CreatedTask>;
    updateTask: (task: CreatedTask) => Promise<CreatedTask>;
    deleteTask: (task: CreatedTask) => Promise<CreatedTask[]>;
}

export interface KanbanProviderProps {
    children: ReactNode;
}
