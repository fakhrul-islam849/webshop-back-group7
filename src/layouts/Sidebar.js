import { useState } from 'react';
import { Menu } from 'react-pro-sidebar';
import { Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import sidebarConfig from './SideBar/sidebarConfig';
import { sidebarConfigForAdvertiser } from './SideBar/sidebarConfig';
import MultiLevel from './SideBar/MultiLevel';
import { useSelector } from 'react-redux';
import { getUserRole } from '../features/auth/authSlice';
import { ROLE_ADMIN } from '../utils/Constant/globalConstant';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    const role = useSelector(getUserRole);

    const adminMenu = () => {
        return (
            <>
                {' '}
                {sidebarConfig.map((item, key) => {
                    const { children, icon, title, path } = item;
                    if (children && children.length > 0) {
                        return <MultiLevel key={key} item={item} />;
                    }
                    return (
                        <Link to={path} key={key} className='bg-primary-500'>
                            <div className='flex flex-row gap-2 justify-start hover:bg-primary-100 w-auto p-2'>
                                <div>{icon}</div>
                                <div className='text-md'>{title}</div>
                            </div>
                        </Link>
                    );
                })}
            </>
        );
    };
    const advertiserMenu = () => {
        return (
            <>
                {' '}
                {sidebarConfigForAdvertiser.map((item, key) => {
                    const { children, icon, title, path } = item;
                    if (children && children.length > 0) {
                        return <MultiLevel key={key} item={item} />;
                    }
                    return (
                        <Link to={path} key={key} className='bg-primary-500'>
                            <div className='flex flex-row gap-2 justify-start hover:bg-primary-100 w-auto p-2'>
                                <div>{icon}</div>
                                <div className='text-md'>{title}</div>
                            </div>
                        </Link>
                    );
                })}
            </>
        );
    };

    return (
        <Box className='w-64 bg-white shadow'>
            {/* <ProSidebar
                collapsed={isCollapsed}
                sx={{ backgroundColor: '#fff !important' }}
            > */}
            <Menu iconShape='square'>
                {/* LOGO AND MENU ICON */}
                <img src='' />
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <div className='text-md p-3'>
                        {role === ROLE_ADMIN ? 'ADMIN' : 'Advertiser'}
                    </div>
                    <IconButton
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        color='primary'
                    >
                        <MenuOutlinedIcon />
                    </IconButton>
                </Box>

                <div className='mt-2'>
                    {role === ROLE_ADMIN ? adminMenu() : advertiserMenu()}
                </div>
            </Menu>
            {/* </ProSidebar> */}
        </Box>
    );
};

export default Sidebar;
