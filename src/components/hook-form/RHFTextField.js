import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
    name: PropTypes.string
};

export default function RHFTextField({
    name,
    label,
    required = false,
    ...other
}) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <label
                        htmlFor={name}
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                        {label}
                    </label>

                    <input
                        type='text'
                        {...field}
                        id={name}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                        placeholder={`Enter ${label}`}
                    />
                    {error?.message && (
                        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                            {error?.message}
                        </p>
                    )}
                </>
                // <input
                //     className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                //     {...field}
                //     fullWidth
                //     error={!!error}
                //     helperText={error?.message}
                //     {...other}
                // />
            )}
        />
    );
}
