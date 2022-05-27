import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../assets/images/404.gif';

const NotFound = () => {
    return (
        <div>
            <div className='grid lg:grid-cols-1'>
                <h1 className='text-center text-warning text-4xl py-10 font-bold'>Page Not found</h1>
                <Link to="/home"><h6 className='text-xl text-blue-800 font-bold underline'>Back to Home</h6></Link>
                <img src={image} className='img-fluid' alt="" />
            </div>
        </div>
    );
};

export default NotFound;