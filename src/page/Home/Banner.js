import React from 'react';
import './banner.css';

const Banner = () => {
    return (
        <div className="flex justify-center items-center text-center home-banner">
            <div>
                <h2 className='font-semibold text-4xl lg:text-6xl text-white'>Find Parts For Your Vehicle</h2>
                <p className='text-gray-300 text-md lg:text-2xl mt-2'>Over hundreds of brands and tens of thousands of parts</p>
            </div>
        </div>
    );
};

export default Banner;