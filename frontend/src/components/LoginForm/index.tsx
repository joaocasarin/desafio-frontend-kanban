/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import Modal from '../Modal';

const Form = styled.form`
    width: 350px;
    height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    background-color: white;

    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const LoginForm = () => {
    const { login, isAuthenticated } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isAuthenticated) {
        return <Navigate to='/dashboard' replace />;
    }

    const onCloseModal = () => setIsModalOpen(false);

    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.currentTarget.value);
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await login(username, password);

            setUsername('');
            setPassword('');

            return <Navigate to='/dashboard' replace />;
        } catch (error) {
            return setIsModalOpen(true);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <h2>Login</h2>

            <TextField
                label='Username'
                type='text'
                id='username'
                onChange={onUsernameChange}
                value={username}
                variant='standard'
                required
                autoFocus
            />

            <TextField
                label='Password'
                type='password'
                id='password'
                onChange={onPasswordChange}
                value={password}
                variant='standard'
                required
            />

            <Button variant='contained' type='submit' color='info'>
                Login
            </Button>

            <Modal
                displayType='error'
                isOpen={isModalOpen}
                onClose={onCloseModal}
                message='Could not login'
            />
        </Form>
    );
};

export default LoginForm;
