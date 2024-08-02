import IconButton from '@mui/material/IconButton';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import React from 'react';

function CustomIconButton({
    children,
    customClass,
    handleButton = null,
    ...rest
}) {
    // Please assign your default style classes which are include in style file
    const defaultClasses = '';
    const classes = `${defaultClasses} ${customClass}`;
    return (
        <StyledEngineProvider injectFirst>
            <IconButton
                className={classes}
                {...rest}
                aria-label='icon-button'
                onClick={handleButton}
            >
                {children}
            </IconButton>
        </StyledEngineProvider>
    );
}

export default CustomIconButton;
