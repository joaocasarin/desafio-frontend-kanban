import styled from 'styled-components';
import LoginForm from '../../components/LoginForm';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #8edcff;

    width: 100vw;
    height: 100vh;
`;

const Dashboard = () => (
    <Div>
        <LoginForm />
    </Div>
);

export default Dashboard;
