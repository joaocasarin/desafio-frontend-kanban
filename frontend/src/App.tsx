import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Others from './pages/Others';

const App = () => (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Others />} />
    </Routes>
);

export default App;
