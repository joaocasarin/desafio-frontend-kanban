import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import ActionBoard from '../Boards';
import NewTaskBoard from '../Boards/CreateTaskBoard';

const DashboradDiv = styled.div`
    display: flex;
    justify-content: space-around;

    background-color: #8edcff;

    width: 100vw;
    height: 100vh;
`;

export const Dashboard = () => {
    const { getTasks } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            await getTasks();
        })();
    }, []);

    return (
        <DashboradDiv>
            <NewTaskBoard key='new' />
            <ActionBoard key='todo' title='ToDo' />
            <ActionBoard key='doing' title='Doing' />
            <ActionBoard key='done' title='Done' />
        </DashboradDiv>
    );
};
