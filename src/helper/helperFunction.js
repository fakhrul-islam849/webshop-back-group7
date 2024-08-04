export const renderErrorMessage = (error, message) => {
    if (error !== undefined) {
        return (
            <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                {message}
            </p>
        );
    }
    return '';
};
export const renderOnlyMessage = (message) => {
    return (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>{message}</p>
    );
};
