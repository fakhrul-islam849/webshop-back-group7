import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/auth/authSlice';
import {useNavigate} from "react-router-dom";

export default function TobBarAction() {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        navigate('/account-setting');
    };

    const handelLogOut = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <div className='overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600'>
                    <svg
                        className='absolute -left-1 w-12 h-12 text-gray-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fill-rule='evenodd'
                            d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                            clip-rule='evenodd'
                        ></path>
                    </svg>
                </div>
            </Button>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handelLogOut}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
