import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { KanbanProvider } from './contexts/KanbanContext';
import { UserProvider } from './contexts/UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserProvider>
            <KanbanProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </KanbanProvider>
        </UserProvider>
    </React.StrictMode>
);
