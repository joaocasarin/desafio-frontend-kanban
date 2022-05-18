import { ReactNode } from 'react';

export interface UserContextProps {
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => Promise<boolean>;
    token: string | undefined;
    isAuthenticated: boolean | undefined;
}

export interface UserProviderProps {
    children: ReactNode;
}
