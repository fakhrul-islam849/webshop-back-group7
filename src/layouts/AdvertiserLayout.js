import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../features/auth/authSlice';
import useAuth from '../hooks/useAuth';
import { ROLE_ADMIN } from '../utils/Constant/globalConstant';
import Sidebar from './Sidebar';
import TopBar from './TopBar/TopBar';

export default function AdvertiserLayout({ children }) {
    const isLoggedIn = useAuth();

    const role = useSelector(getUserRole);

    const renderComponent = () => {
        return (
            <div className='flex flex-row min-h-screen bg-gray-100 text-gray-800'>
                <Sidebar />

                <main className='main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in'>
                    <TopBar />
                    <div className='main-content flex flex-col flex-grow p-4'>
                        {children}
                    </div>
                    <footer className='footer px-4 py-6'>
                        <div className='footer-content'>
                            <p className='text-sm text-gray-600 text-center'>
                                © Drugx 2022. All rights reserved.{' '}
                                <a href='https://twitter.com/iaminos'>
                                    by Recline IT
                                </a>
                            </p>
                        </div>
                    </footer>
                </main>
            </div>
        );
    };

    return isLoggedIn ? renderComponent() : <Navigate to='/login' />;
}
