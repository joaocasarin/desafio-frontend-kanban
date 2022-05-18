import { ReactNode } from 'react';

export interface UserContextProps {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => Promise<boolean>;
    isLoading: boolean;
}

export interface UserProviderProps {
    children: ReactNode;
}
