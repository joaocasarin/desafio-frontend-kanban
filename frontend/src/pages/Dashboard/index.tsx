/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { KanbanContext } from '../../contexts/KanbanContext';
import { UserContext } from '../../contexts/UserContext';
import ActionBoard from '../../components/Column';
import Modal from '../../components/Modal';

const NewDashboard = styled.div`
    display: flex;
    justify-content: space-around;

    background-color: #e6ede9;

    width: 100vw;
    height: 100vh;
`;

const Dashboard = () => {
    const { isAuthenticated } = useContext(UserContext);

    const { getTasks } = useContext(KanbanContext);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDisplayType, setModalDisplayType] = useState<'edit' | 'view' | 'error' | 'success'>(
        'error'
    );

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

    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    const onCloseModal = () => setIsModalOpen(false);

    return (
        <NewDashboard>
            <ActionBoard title='New' newTask />
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
