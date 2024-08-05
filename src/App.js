import React from 'react';
import Router from './routes';
import './index.css';
import useAuthCheck from './hooks/useAuthCheck';
import { ToastContainer } from 'react-toastify';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import useIdleTime from './utils/useIdleTime';

function App() {
    useIdleTime();
    const authChecked = useAuthCheck();
    return !authChecked ? (
        <div>Checking authentication....</div>
    ) : (
        <div className='App'>
            <Router />
            <ToastContainer
                position='top-right'
                newestOnTop
                enableMultiContainer
            />
        </div>
    );
}

export default App;
