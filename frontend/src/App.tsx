import { Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/Login';
import { Dashboard } from './components/Dashboard';

const App = () => (
    <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
);

export default App;
