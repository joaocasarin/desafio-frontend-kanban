import { ReactNode } from 'react';
import { CreatedTask } from './Task';

export interface KanbanContextProps {
    tasks: CreatedTask[];
    getTasks: () => Promise<CreatedTask[]>;
}

export interface KanbanProviderProps {
    children: ReactNode;
}
