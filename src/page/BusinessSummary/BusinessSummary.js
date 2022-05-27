import React from 'react';
import './BusinessSummary.css';
import {GlobeIcon, ThumbUpIcon, UserGroupIcon } from '@heroicons/react/solid'

const BusinessSummary = () => {
    return (
        <section className='business-summary bg-black pb-5'>
            <div className='px-10 mx-auto'>
               <div className='py-28'>
               <h2 className='mb-3 font-bold uppercase text-4xl lg:text-5xl text-center text-slate-200'>Our business expansion</h2>
                <p className='text-center text-2xl font-semibold text-slate-300'>Customer Expectation</p>
               </div>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-white'>
                    <div className="card lg:max-w-lg shadow-xl">
                        <div className="card-body text-center">
                            <UserGroupIcon className="h-16 w-16 mx-auto text-blue-500"></UserGroupIcon>
                            <h2 className='text-xl lg:text-3xl font-bold'>1000+ Dealers</h2>
                        </div>
                    </div>

                    <div className="card lg:max-w-lg shadow-xl">
                        <div className="card-body text-center">
                            <GlobeIcon className="h-16 w-16 mx-auto text-blue-500"></GlobeIcon>
                            <h2 className='text-xl lg:text-3xl font-bold'>89+ COUNTRIES</h2>
                        </div>
                    </div>
                    <div className="card lg:max-w-lg shadow-xl">
                        <div className="card-body text-center">
                            <ThumbUpIcon className="h-16 w-16 mx-auto text-blue-500"></ThumbUpIcon>
                            <h2 className='text-xl lg:text-3xl font-bold'>300+ FEEDBACK</h2>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BusinessSummary;