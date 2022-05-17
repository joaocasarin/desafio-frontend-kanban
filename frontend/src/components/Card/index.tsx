import styled from 'styled-components';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Divider, IconButton } from '@mui/material';
import randomcolor from 'randomcolor';
import { CreatedTask } from '../../interfaces/Task';

const Card = styled.div`
    width: 260px;
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

const CardComponent = ({ task }: { task: CreatedTask }) => (
    <Card style={{ backgroundColor: randomcolor() }}>
        <Buttons>
            {task.titulo}
            <IconButton aria-label='visualize' size='small' onClick={() => {}}>
                <VisibilityIcon fontSize='inherit' />
            </IconButton>
        </Buttons>
        <Divider variant='middle' />
        <Buttons>
            <IconButton aria-label='moveToLeft' size='small' onClick={() => {}}>
                <ArrowCircleLeftIcon fontSize='inherit' />
            </IconButton>
            <IconButton aria-label='delete' size='small' onClick={() => {}}>
                <RemoveCircleIcon fontSize='inherit' />
            </IconButton>
            <IconButton aria-label='edit' size='small' onClick={() => {}}>
                <EditIcon fontSize='inherit' />
            </IconButton>
            <IconButton aria-label='moveToRight' size='small' onClick={() => {}}>
                <ArrowCircleRightIcon fontSize='inherit' />
            </IconButton>
        </Buttons>
    </Card>
);

export default CardComponent;
