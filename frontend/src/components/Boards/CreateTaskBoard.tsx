import { AddCircle } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';

const ActionBoard = styled.div`
    width: calc(calc(100vw - 140px) / 4);
    min-height: 150px;

    margin: 10px;
    border-radius: 10px;

    background-color: #bbeaff;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ActionBoardComponent = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskContent, setTaskContent] = useState('');

    const { createTask } = useContext(UserContext);

    const handleTaskTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    };

    const handleTaskContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskContent(event.currentTarget.value);
    };

    const createNewTask = async () => {
        if (!taskTitle || !taskContent) {
            return;
        }

        await createTask({
            conteudo: taskContent,
            lista: 'ToDo',
            titulo: taskTitle
        });

        setTaskTitle('');
        setTaskContent('');
    };

    return (
        <ActionBoard>
            <h1>New Task</h1>
            <TextField
                label='Task Title'
                placeholder='Fix layout bug'
                onChange={handleTaskTitleChange}
                value={taskTitle}
                margin='normal'
            />
            <TextField
                label='Task Content'
                placeholder='modify file X.tsx to stop..'
                onChange={handleTaskContentChange}
                value={taskContent}
                margin='normal'
            />
            <IconButton aria-label='add' size='large' onClick={createNewTask}>
                <AddCircle fontSize='inherit' />
            </IconButton>
        </ActionBoard>
    );
};

export default ActionBoardComponent;
