import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem
} from '@mui/material';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
const MultiLevel = ({ item }) => {
    const { children, title, icon } = item;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <div
                className='flex flex-row gap-2 justify-start hover:bg-primary-100 w-auto p-2'
                onClick={() => handleClick()}
            >
                <div>{icon}</div>
                <div className='text-md'>{title}</div>
                <div className='text-md text-right'>
                    {' '}
                    {open ? (
                        <KeyboardArrowDownIcon fontSize='10px' />
                    ) : (
                        <ArrowForwardIosIcon fontSize='10px' />
                    )}
                </div>
            </div>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {children.map((child, key) => (
                        <Link key={key} to={child.path}>
                            <div className='flex flex-row gap-2 justify-start hover:bg-primary-100 w-auto p-2'>
                                <div className='text-md'>{child.title}</div>
                            </div>
                        </Link>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default MultiLevel;
