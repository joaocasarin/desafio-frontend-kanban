/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { UserContextProps, UserProviderProps } from '../interfaces';
import { api } from '../utils';

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
    const [token, setToken, removeToken] = useLocalStorage<string>('token');
    const [isAuthenticated, setIsAuthenticated, removeIsAuth] = useLocalStorage<boolean>(
        'isAuthenticated',
        false
    );

    const login = async (username: string, password: string): Promise<void> => {
        const response = await api.post('/login', {
            login: username,
            senha: password
        });

        if (response.status === 401 || (response.data as string).length === 0) {
            throw new Error('Invalid credentials');
        }

        const { data } = response as { data: string };

        localStorage.setItem('token', data);
        setIsAuthenticated(true);
    };

    const logout = (): void => {
        removeToken();
        removeIsAuth();
    };

    const isLoggedIn = async (): Promise<boolean> => {
        const response = await api.get('/cards', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        return true;
    };

    return (
        <UserContext.Provider
            value={{
                login,
                isLoggedIn,
                logout,
                token,
                isAuthenticated
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
