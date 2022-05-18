import { useContext, useState } from 'react';
import styled from 'styled-components';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Divider, IconButton, Typography } from '@mui/material';
import randomcolor from 'randomcolor';
import Modal from '../Modal';
import { CreatedTask } from '../../interfaces';
import { COLUMNS } from '../../utils';
import { KanbanContext } from '../../contexts/KanbanContext';

const Card = styled.div`
    width: 80%;
    height: 70px;

    margin-bottom: 10px;
    padding: 5px;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
`;

const CardComponent = ({ task }: { task: CreatedTask }) => {
    const { titulo, lista } = task;
    const { updateTask, deleteTask } = useContext(KanbanContext);
    const ColumnsCount = COLUMNS.length;

    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDisplayType, setModalDisplayType] = useState<'edit' | 'view' | 'error' | 'success'>(
        'success'
    );

    const onOpenModal = (displayMode: 'edit' | 'view' | 'error' | 'success') => {
        setModalDisplayType(displayMode);
        setIsModalOpen(true);
    };

    const onCloseModal = () => setIsModalOpen(false);

    const moveToLeft = async () => {
        const posIndex = COLUMNS.indexOf(lista);
        const newPosition =
            posIndex > 0 && posIndex < ColumnsCount
                ? COLUMNS[posIndex - 1]
                : COLUMNS[ColumnsCount - 1];

        try {
            return await updateTask({
                ...task,
                lista: newPosition
            });
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage('An unknown error occurred');
            }

            return onOpenModal('error');
        }
    };

    const moveToRight = async () => {
        const posIndex = COLUMNS.indexOf(lista);
        const newPosition =
            posIndex < ColumnsCount - 1 && posIndex > -1 ? COLUMNS[posIndex + 1] : COLUMNS[0];

        try {
            return await updateTask({
                ...task,
                lista: newPosition
            });
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage('An unknown error occurred');
            }

            return onOpenModal('error');
        }
    };

    const onDeleteTask = async () => {
        try {
            return await deleteTask(task);
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage('An unknown error occurred');
            }

            return onOpenModal('error');
        }
    };

    return (
        <Card style={{ backgroundColor: randomcolor({ luminosity: 'light' }) }}>
            <Buttons>
                <Typography variant='subtitle1' marginLeft={2}>
                    {titulo}
                </Typography>

                <IconButton aria-label='visualize' size='small' onClick={() => onOpenModal('view')}>
                    <VisibilityIcon fontSize='inherit' />
                </IconButton>
            </Buttons>

            <Divider variant='middle' />

            <Buttons>
                <IconButton aria-label='moveToLeft' size='small' onClick={moveToLeft}>
                    <ArrowCircleLeftIcon fontSize='inherit' />
                </IconButton>

                <IconButton aria-label='delete' size='small' onClick={onDeleteTask}>
                    <RemoveCircleIcon fontSize='inherit' />
                </IconButton>

                <IconButton aria-label='edit' size='small' onClick={() => onOpenModal('edit')}>
                    <EditIcon fontSize='inherit' />
                </IconButton>

                <IconButton aria-label='moveToRight' size='small' onClick={moveToRight}>
                    <ArrowCircleRightIcon fontSize='inherit' />
                </IconButton>
            </Buttons>

            <Modal
                displayType={modalDisplayType}
                isOpen={isModalOpen}
                onClose={onCloseModal}
                task={task}
                message={message}
            />
        </Card>
    );
};

export default CardComponent;
