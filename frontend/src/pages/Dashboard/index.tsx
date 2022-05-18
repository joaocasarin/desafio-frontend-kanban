/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ActionBoard from '../../components/Column';
import NewTaskBoard from '../../components/Column/NewTaskColumn';
import { KanbanContext } from '../../contexts/KanbanContext';
import Modal from '../../components/Modal';
import { UserContext } from '../../contexts/UserContext';
import { Navigate } from 'react-router-dom';

const NewDashboard = styled.div`
    display: flex;
    justify-content: space-around;

    background-color: #e6ede9;

    width: 100vw;
    height: 100vh;
`;

const Dashboard = () => {
    const { isAuthenticated } = useContext(UserContext);

    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    const { getTasks } = useContext(KanbanContext);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDisplayType, setModalDisplayType] = useState<'edit' | 'view' | 'error' | 'success'>(
        'error'
    );

    const onCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        (async () => {
            try {
                return await getTasks();
            } catch (error) {
                if (error instanceof Error) {
                    setMessage(error.message);
                } else {
                    setMessage('Something went wrong.');
                }

                setModalDisplayType('error');
                return setIsModalOpen(true);
            }
        })();
    }, []);

    return (
        <NewDashboard>
            <NewTaskBoard key='new' />
            <ActionBoard key='todo' title='To Do' />
            <ActionBoard key='doing' title='Doing' />
            <ActionBoard key='done' title='Done' />
            <Modal
                displayType={modalDisplayType}
                isOpen={isModalOpen}
                message={message}
                onClose={onCloseModal}
            />
        </NewDashboard>
    );
};

export default Dashboard;
