import React from 'react';
import { Link } from 'react-router-dom';

const Section1 = () => {
    return (
        <section className='w-11/12 py-10 px-20 mx-auto'>
            <div className="bg-[url('/src/assets/images/section1.jpg')] h-[100%] bg-no-repeat">
                <div className='py-28 px-12'>
                    <p className='text-[#EB5532] text-lg font-semibold'>Sale 30% off</p>
                    <h1 className='uppercase block text-3xl lg:text-5xl py-3 text-white font-bold'>Replacement</h1>
                    <h1 className='uppercase block text-3xl lg:text-5xl py-3 text-white font-bold'>Car parts</h1>
                    <Link to="/parts">
                    <button className='btn btn-success glass text-white font-semibold my-5'>Order Now</button></Link>
                </div>
            </div>
        </section>
    );
};

export default Section1;