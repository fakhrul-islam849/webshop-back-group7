import ClearIcon from '@mui/icons-material/Clear';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {
    FormControl,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    StyledEngineProvider,
    Theme
} from '@mui/material';
import CustomIconButton from '../Buttons/CustomIconButton';

import { makeStyles } from '@mui/styles';

import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 200,
        '& .MuiOutlinedInput-root': {
            color: 'green'
        },
        '& .MuiInputLabel-root': {
            color: 'green'
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'green'
        },
        '&:hover .MuiOutlinedInput-input': {
            color: 'red'
        },
        '&:hover .MuiInputLabel-root': {
            color: 'red'
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            color: 'purple'
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'purple'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
                borderColor: 'purple'
            }
    },
    formControl: {
        margin: theme.spacing(1)
        // width: 300,
    },
    indeterminateColor: {
        color: '#f50057'
    },
    selectAllText: {
        fontWeight: 500
    },
    selectedAll: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200
        },
        autoFocus: false
    },
    getContentAnchorEl: null,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'center'
    },
    variant: 'menu'
};

const DynamicSelectBox = ({
    selectedValue,
    setSelectedValue,
    options,
    label,
    size = 'small',
    name = 'selectbox',
    register = {},
    menuClasses = '',
    customClass = '',
    fieldDisable = false,
    placeholder = '',
    // handleChange = null,
    titleLength = 25,
    inputLabelSize = 'small',
    searchable = true,
    addSearchedOption,
    disableItems = [],
    helperText = '',
    ...rest
}) => {
    const classes = useState();
    const defaultClasses = '';
    const styled = `${defaultClasses} ${customClass}`;
    const [tempOptions, setTempOptions] = useState(options);

    const [searchValue, setSearchValue] = useState('');
    const [clearable, setClearable] = useState(false);

    const renderValue = (id) => {
        return options.map((item) => {
            if (item.id == id) {
                return item.name;
            }

            return '';
        });
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedValue(value);
    };

    const searchOption = (searchKey, array) => {
        setSearchValue(searchKey);
        setTempOptions(array.filter((val) => val.name.includes(searchKey)));
    };

    const addOption = (keyCode) => {
        if (
            (keyCode === 13 || keyCode === 'mouseup') &&
            tempOptions.length === 0
        ) {
            if (typeof addSearchedOption === 'function') {
                addSearchedOption(searchValue);
                setSearchValue('');
                setTempOptions(options);
            } else {
                console.warn(
                    'Pleaser create a function body and update the options by adding returned searched item'
                );
                setSearchValue('');
                setTempOptions(options);
            }
        }
    };

    const renderSearchBar = () => {
        return (
            <MenuItem
                onKeyDown={(e) => e.stopPropagation()}
                sx={{
                    '&.Mui-focusVisible': { backgroundColor: 'transparent' }
                }}
            >
                <OutlinedInput
                    id='outlined-adornment-selectbox'
                    size={size}
                    color='info'
                    value={searchValue}
                    fullWidth
                    // onKeyUp={(e) => addOption(e.keyCode)}
                    onKeyDown={(e) => e.stopPropagation()}
                    onChange={(e) => searchOption(e.target.value, options)}
                    endAdornment={
                        <InputAdornment position='end'>
                            {searchValue ? (
                                <CustomIconButton
                                    size={size}
                                    handleButton={() => {
                                        setSearchValue('');
                                        setTempOptions(options);
                                    }}
                                >
                                    <ClearIcon fontSize='medium' />
                                </CustomIconButton>
                            ) : (
                                <ManageSearchIcon fontSize='medium' />
                            )}
                        </InputAdornment>
                    }
                />
            </MenuItem>
        );
    };

    const renderClearIcon = () => {
        if (clearable && selectedValue) {
            return (
                <CustomIconButton
                    sx={{ right: '32px' }}
                    handleButton={(e) => {
                        e.stopPropagation();
                    }}
                    size={size}
                >
                    <ClearIcon fontSize={size} />
                </CustomIconButton>
            );
        }
    };

    const renderCreateOption = () => {
        return (
            <MenuItem
                onKeyDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => addOption(e.type)}
            >
                <ListItemText secondary={`Add '${searchValue}'`} />
            </MenuItem>
        );
    };

    const renderOptions = () => {
        return tempOptions.map((option) => (
            <MenuItem
                onKeyDown={(e) => e.stopPropagation()}
                disabled={!!disableItems.includes(option.id)}
                key={option.name}
                value={option.id}
            >
                <ListItemText primary={option.name} />
            </MenuItem>
        ));
    };
    const renderNoOptionFound = () => {
        return (
            <MenuItem>
                <ListItemText
                    secondary={
                        label
                            ? `${label}s  not available`
                            : 'No option available'
                    }
                />
            </MenuItem>
        );
    };

    return (
        <StyledEngineProvider injectFirst>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                {label}
            </label>
            <FormControl
                sx={{
                    width: '100%',
                    minWidth: '200px'
                }}
            >
                {/* <InputLabel
                    id='demo-dynamic-selectbox-label'
                    size='small'
                    color='secondary'
                >
                    {label}
                </InputLabel> */}
                <Select
                    sx={{ width: '100%' }}
                    labelId='dynamic-selectbox-label'
                    id='dynamic-selectbox'
                    input={<OutlinedInput />}
                    value={selectedValue}
                    onChange={(event, newValue) => {
                        handleChange(newValue);
                    }}
                    MenuProps={
                        menuClasses != '' &&
                        menuClasses != null &&
                        menuClasses != undefined
                            ? { className: menuClasses }
                            : MenuProps
                    }
                    renderValue={renderValue}
                    name={name}
                    size={size}
                    // color='primary'
                    displayEmpty={false}
                    defaultValue={selectedValue}
                    // onChange={handleChangeEvent}
                    disabled={fieldDisable}
                    // className={styled}
                    className={classes.root}
                    placeholder={placeholder}
                    onKeyDown={(e) => e.stopPropagation()}
                    defaultChecked={false}
                    // endAdornment={renderClearIcon()}
                    {...register}
                    {...rest}
                >
                    {searchable ? renderSearchBar() : null}

                    {/* {searchable && searchValue && tempOptions.length === 0
                        ? renderCreateOption()
                        : null} */}
                    {renderOptions()}
                    {options?.length == 0 && renderNoOptionFound()}
                </Select>
            </FormControl>
            {helperText != '' && helperText}
        </StyledEngineProvider>
    );
};

export default DynamicSelectBox;
