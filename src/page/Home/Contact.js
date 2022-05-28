import React from 'react';

const Contact = () => {
    return (
        <section className='text-center bg-base-200'>

            <div className='mx-auto sm:w-full px-5 lg:w-2/4 py-10'>
                <div className='mb-5'>
                    <h4 className='text-lg lg:text-xl text-secondary font-bold'>Contact Us</h4>
                    <h3 className='text-black text-2xl lg:text-3xl'>Stay connected with us</h3>
                </div>
                <div className='mb-5'>
                    <input type="text" placeholder="Email Address" className="mb-5 input input-bordered input-md w-full" />
                    <input type="text" placeholder="Subject" className="mb-5 input input-bordered input-md w-full" />
                    <textarea className="textarea w-full" placeholder="Your Message"></textarea>
                </div>
                <button className=' w-2/4 btn btn-primary font-bold'>Send</button>

            </div>

        </section>
    );
};

export default Contact;