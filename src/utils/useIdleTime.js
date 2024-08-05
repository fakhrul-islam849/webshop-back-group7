import React from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../features/auth/authSlice';

function useIdleTime() {
    const dispatch = useDispatch();
    const timeout = 900000;
    // const timeout = 5000;

    const handleOnActive = () => {
        return null;
    };
    const handleOnIdle = () => {
        const currentURL = window.location.href;
        if (!currentURL.includes('login')) {
            dispatch(userLoggedOut());
            localStorage.clear();
        }
    };

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout,
        onActive: handleOnActive,
        onIdle: handleOnIdle,
        crossTab: {
            emitOnAllTabs: true
        }
    });
}

export default useIdleTime;
