import { AddCircle } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import { KanbanContext } from '../../contexts/KanbanContext';
import { UserContext } from '../../contexts/UserContext';
import { ColumnProps } from '../../interfaces';
import Modal from '../Modal';
import Card from '../Card';

const NewColumnComponent = styled.div`
    width: calc(calc(100vw - 140px) / 4);
    min-height: 150px;

    margin: 10px;
    border-radius: 10px;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }
    ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }
    ::-webkit-scrollbar-thumb {
        background: #c2e4ff;
        border: 0px none #ffffff;
        border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #63a9dc;
    }
    ::-webkit-scrollbar-thumb:active {
        background: #63a9dc;
    }
    ::-webkit-scrollbar-track {
        background: #666666;
        border: 0px none #ffffff;
        border-radius: 100px;
    }
    ::-webkit-scrollbar-track:hover {
        background: #666666;
    }
    ::-webkit-scrollbar-track:active {
        background: #666666;
    }
    ::-webkit-scrollbar-corner {
        background: transparent;
    }
`;

const Column = ({ title, newTask }: ColumnProps) => {
    const { tasks } = useContext(KanbanContext);

    // remove white spaces from the string to render 'To Do' instead of 'ToDo' if it is the first column
    const titleToLista = title.replace(/\s/g, '');

    const { logout } = useContext(UserContext);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskContent, setTaskContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [modalType, setModalType] = useState<'edit' | 'view' | 'error' | 'success'>('success');

    const onCloseModal = () => setIsModalOpen(false);
    const changeMessage = (msg: string) => setMessage(msg);

    const { createTask } = useContext(KanbanContext);

    const handleTaskTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    };

    const handleTaskContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskContent(event.currentTarget.value);
    };

    const createNewTask = async (): Promise<void> => {
        if (!taskTitle || !taskContent) {
            changeMessage('Please fill all fields.');
            setModalType('error');
            return setIsModalOpen(true);
        }

        try {
            const createdTask = await createTask({
                conteudo: taskContent,
                lista: 'ToDo',
                titulo: taskTitle
            });

            if (!createdTask) {
                changeMessage('An error occurred while creating the task.');
                setModalType('error');
                return setIsModalOpen(true);
            }

            setTaskTitle('');
            return setTaskContent('');
        } catch (error) {
            if (error instanceof Error) {
                changeMessage(error.message);
            } else {
                changeMessage('An error occurred while creating the task.');
            }

            setModalType('error');
            return setIsModalOpen(true);
        }
    };

    if (newTask) {
        return (
            <NewColumnComponent>
                <h1>New Task</h1>
                <div style={{ width: '80%' }}>
                    <TextField
                        label='Task Title'
                        placeholder='Fix layout bug'
                        onChange={handleTaskTitleChange}
                        value={taskTitle}
                        margin='normal'
                        fullWidth
                    />
                    <TextField
                        label='Task Content'
                        placeholder='modify file X.tsx to stop..'
                        onChange={handleTaskContentChange}
                        value={taskContent}
                        margin='normal'
                        multiline
                        rows={4}
                        fullWidth
                    />
                </div>
                <IconButton aria-label='add' size='large' onClick={createNewTask}>
                    <AddCircle sx={{ color: '#63a9dc' }} fontSize='inherit' />
                </IconButton>
                <IconButton aria-label='add' size='large' onClick={logout}>
                    <LogoutIcon fontSize='inherit' />
                </IconButton>
                <Modal
                    displayType={modalType}
                    isOpen={isModalOpen}
                    onClose={onCloseModal}
                    message={message}
                />
            </NewColumnComponent>
        );
    }

    return (
        <NewColumnComponent>
            {title && <h1>{title}</h1>}
            {tasks
                .filter((task) => task.lista === titleToLista)
                .map((task) => (
                    <Card task={task} key={task.id} />
                ))}
        </NewColumnComponent>
    );
};

export default Column;
