import React from 'react';

function Container({ children }) {
    return (
        <div className='w-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm mt-4'>
            {children}
        </div>
    );
}

export default Container;
