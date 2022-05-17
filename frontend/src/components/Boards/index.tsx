import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import { ActionBoardProps } from '../../interfaces';
import Card from '../Card';

const ActionBoard = styled.div`
    width: calc(calc(100vw - 140px) / 4);
    min-height: 150px;

    margin: 10px;
    border-radius: 10px;

    background-color: #bbeaff;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: auto;
`;

const ActionBoardComponent = ({ title }: ActionBoardProps) => {
    const { tasks } = useContext(UserContext);

    return (
        <ActionBoard>
            {title && <h1>{title}</h1>}
            {tasks
                .filter((task) => task.lista === title)
                .map((task) => (
                    <Card task={task} />
                ))}
        </ActionBoard>
    );
};

export default ActionBoardComponent;
