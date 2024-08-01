import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../features/auth/authSlice';
import useAuth from '../hooks/useAuth';
import { ROLE_ADMIN } from '../utils/Constant/globalConstant';
import Sidebar from './Sidebar';
import TopBar from './TopBar/TopBar';

export default function MainLayout({ children }) {
    const isLoggedIn = useAuth();

    const role = useSelector(getUserRole);

    const renderComponent = () => {
        if (role === ROLE_ADMIN) {
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
        }

        return (
            <section className='flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100'>
                <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
                    <div className='max-w-md text-center'>
                        <h2 className='mb-8 font-extrabold text-9xl dark:text-gray-600'>
                            <span className='sr-only'>Error</span>404
                        </h2>
                        <p className='text-2xl font-semibold md:text-3xl'>
                            Sorry, we couldn't find this page.
                        </p>
                        <p className='mt-4 mb-8 dark:text-gray-400'>
                            But dont worry, you can find plenty of other things
                            on our homepage.
                        </p>
                        <a
                            rel='noopener noreferrer'
                            href='/advertiser/dashboard'
                            className='px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900'
                        >
                            Back to homepage
                        </a>
                    </div>
                </div>
            </section>
        );
    };

    return isLoggedIn ? renderComponent() : <Navigate to='/login' />;
}
