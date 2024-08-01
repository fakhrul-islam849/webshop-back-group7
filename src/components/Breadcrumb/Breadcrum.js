import React from 'react';

function Breadcrum(props) {
    const { headerText, button } = props || {};
    return (
        <div className='w-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-row justify-between'>
            <div className='text-md'>{headerText}</div>
            <div>{button && button()}</div>
        </div>
    );
}

export default Breadcrum;
