import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import LoginForm from '../../components/Login';

const Div = styled.div`
    display: flex;
    justify-content: space-around;

    background-color: #8edcff;

    width: 100vw;
    height: 100vh;
`;

const Dashboard = () => {
    const { getTasks } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            await getTasks();
        })();
    }, []);

    return (
        <Div>
            <LoginForm />
        </Div>
    );
};

export default Dashboard;
