import { Box, Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import CustomIconButton from '../Buttons/CustomIconButton';
// import CustomIconButton from "../Buttons/IconButton/CustomIconButton";

export default function CustomDropDownButtonMenu({
    buttonContent,
    disabledStatus = false,
    options,
    itemWidth
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMenuItems = () => {
        if (options.length > 0) {
            const data = options.map((item, index) => {
                return (
                    <MenuItem
                        disabled={item?.disabled}
                        sx={{ width: itemWidth }}
                        onClick={() => {
                            handleClose();
                            item.handleClick();
                        }}
                        key={index}
                    >
                        {item.name}
                    </MenuItem>
                );
            });

            return data;
        }
    };

    return (
        <Box>
            <CustomIconButton
                handleButton={handleClick}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                disabled={disabledStatus}
            >
                {buttonContent}
            </CustomIconButton>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                {renderMenuItems()}
            </Menu>
        </Box>
    );
}
