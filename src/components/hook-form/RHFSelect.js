import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    label: PropTypes.string || ''
};

export default function RHFSelect({ name, children, label, ...other }) {
    const { control } = useFormContext();

    return (
        <>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                {label ? label : 'Unknown'}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        size='small'
                        {...field}
                        select
                        fullWidth
                        SelectProps={{ native: true }}
                        error={!!error}
                        helperText={error?.message}
                        {...other}
                    >
                        {children}
                    </TextField>
                )}
            />
        </>
    );
}
