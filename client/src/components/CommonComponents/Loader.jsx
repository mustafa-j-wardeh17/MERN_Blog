import React from 'react';

const Loader = () => {
    return (
        <div className='w-full h-[300px] flex flex-col space-y-1 items-center justify-center'>
            <div className='relative'>
                <div className='w-16 h-16 border-t-4 border-red-500 border-solid rounded-full animate-spin' />
            </div>
            <p className='flex items-center'>
                Loading data{' ... '}
            </p>
        </div>
    );
};

export default Loader;
