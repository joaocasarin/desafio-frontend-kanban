/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import Modal from '../Modal';

const Form = styled.form`
    width: 350px;
    height: 250px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    background-color: rgb(105, 161, 245);

    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
    height: 30px;

    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

    padding: 0 10px;
    margin: 0 0 0 10px;

    font-size: 16px;
    font-weight: bold;

    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    height: 30px;

    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

    padding: 0 10px;
    margin: 0 0 0 10px;

    font-size: 16px;
    font-weight: bold;

    &:hover {
        cursor: pointer;

        background-color: rgb(4, 254, 170);
    }
`;

const LoginForm = () => {
    const { login, isAuthenticated } = useContext(UserContext);

    if (isAuthenticated) {
        return <Navigate to='/dashboard' replace />;
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            console.log(error);
            setIsModalOpen(true);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <h2>Login</h2>

            <label htmlFor='username'>
                Username:
                <Input type='text' id='username' onChange={onUsernameChange} value={username} />
            </label>

            <label htmlFor='password'>
                Password:
                <Input type='password' id='password' onChange={onPasswordChange} value={password} />
            </label>

            <Button type='submit'>Login</Button>

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
