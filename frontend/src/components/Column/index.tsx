import { useContext } from 'react';
import styled from 'styled-components';
import { KanbanContext } from '../../contexts/KanbanContext';
import { ActionBoardProps } from '../../interfaces';
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

const Column = ({ title }: ActionBoardProps) => {
    const { tasks } = useContext(KanbanContext);

    // remove white spaces from the string to render 'To Do' instead of 'ToDo' if it is the first column
    const titleToLista = title.replace(/\s/g, '');

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
