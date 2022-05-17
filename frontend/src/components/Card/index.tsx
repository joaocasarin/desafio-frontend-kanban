import { useContext } from 'react';
import styled from 'styled-components';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Divider, IconButton } from '@mui/material';
import randomcolor from 'randomcolor';
import { CreatedTask } from '../../interfaces/Task';
import { UserContext } from '../../contexts/UserContext';
import { COLUMNS } from '../../utils';

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
    const { id, conteudo, lista, titulo } = task;
    const { updateTask } = useContext(UserContext);
    const ColumnsCount = COLUMNS.length;

    const moveToLeft = async () => {
        const posIndex = COLUMNS.indexOf(lista);
        const newPosition =
            posIndex > 0 && posIndex < ColumnsCount
                ? COLUMNS[posIndex - 1]
                : COLUMNS[ColumnsCount - 1];

        await updateTask({
            id,
            conteudo,
            lista: newPosition,
            titulo
        });
    };

    const moveToRight = async () => {
        const posIndex = COLUMNS.indexOf(lista);
        const newPosition =
            posIndex < ColumnsCount - 1 && posIndex > -1 ? COLUMNS[posIndex + 1] : COLUMNS[0];

        await updateTask({
            id,
            conteudo,
            lista: newPosition,
            titulo
        });
    };

    return (
        <Card style={{ backgroundColor: randomcolor() }}>
            <Buttons>
                {titulo}
                <IconButton aria-label='visualize' size='small' onClick={() => console.log(task)}>
                    <VisibilityIcon fontSize='inherit' />
                </IconButton>
            </Buttons>
            <Divider variant='middle' />
            <Buttons>
                <IconButton aria-label='moveToLeft' size='small' onClick={moveToLeft}>
                    <ArrowCircleLeftIcon fontSize='inherit' />
                </IconButton>
                <IconButton aria-label='delete' size='small' onClick={() => console.log(task)}>
                    <RemoveCircleIcon fontSize='inherit' />
                </IconButton>
                <IconButton aria-label='edit' size='small' onClick={() => console.log(task)}>
                    <EditIcon fontSize='inherit' />
                </IconButton>
                <IconButton aria-label='moveToRight' size='small' onClick={moveToRight}>
                    <ArrowCircleRightIcon fontSize='inherit' />
                </IconButton>
            </Buttons>
        </Card>
    );
};

export default CardComponent;
