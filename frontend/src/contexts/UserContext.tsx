/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import { LoginResponseData, UserContextProps, UserProviderProps } from '../interfaces';
import { api } from '../utils';

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: UserProviderProps) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibGV0c2NvZGUiLCJpYXQiOjE2NTI4NDA0NjYsImV4cCI6MTY1Mjg0NDA2Nn0.LJBipEuDzZN8sQJ7i68aXMPpK9vJqN6iV7tr9bK4z9I';
    const [isLoading, setIsLoading] = useState(false);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        const response = await api.post('/login', {
            username,
            password
        });

        const { data, status } = response as LoginResponseData;

        if (status === 401) {
            throw new Error('Invalid credentials');
        }

        localStorage.setItem('token', data);
        setIsLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
    };

    const isLoggedIn = async () => {
        setIsLoading(true);
        const response = await api.get('/cards', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setIsLoading(false);

        return response.status === 200;
    };

    return (
        <UserContext.Provider
            value={{
                login,
                isLoggedIn,
                logout,
                isLoading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
