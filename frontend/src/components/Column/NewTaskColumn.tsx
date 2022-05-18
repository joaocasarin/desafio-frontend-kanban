import { AddCircle } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import { KanbanContext } from '../../contexts/KanbanContext';
import Modal from '../Modal';

const NewColumn = styled.div`
    width: calc(calc(100vw - 140px) / 4);
    min-height: 150px;

    margin: 10px;
    border-radius: 10px;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Column = () => {
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

    const createNewTask = async () => {
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
            setTaskContent('');
            changeMessage('Task created successfully.');
            setModalType('success');
            return setIsModalOpen(true);
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

    return (
        <NewColumn>
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
            <Modal
                displayType={modalType}
                isOpen={isModalOpen}
                onClose={onCloseModal}
                message={message}
            />
        </NewColumn>
    );
};

export default Column;
