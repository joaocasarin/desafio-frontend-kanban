import { CreatedTask, Task } from './Task';

export interface UserContextProps {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => Promise<boolean>;
    isLoading: boolean;
    createTask: (task: Task) => Promise<CreatedTask | undefined>;
    getTasks: () => Promise<CreatedTask[] | undefined>;
    deleteTask: (id: string) => Promise<CreatedTask[] | undefined>;
    updateTask: (task: CreatedTask) => Promise<CreatedTask | undefined>;
    tasks: CreatedTask[];
}
