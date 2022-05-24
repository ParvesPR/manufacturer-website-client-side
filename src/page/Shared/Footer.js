import React from 'react';

const Footer = () => {
    return (
        <footer
            className="p-10 text-white mx-auto bg-slate-600">
            <div className='footer justify-between'>
                <div>
                    <span className="footer-title">Services</span>
                    <button className="link link-hover">Emergency Checkup</button>
                    <button className="link link-hover">Monthly Checkup</button>
                    <button className="link link-hover">Weekly Checkup</button>
                    <button className="link link-hover">Deep Checkup</button>
                </div>
                <div>
                    <span className="footer-title">ORAL HEALTH</span>
                    <button className="link link-hover">Fluoride Treatment</button>
                    <button className="link link-hover">Cavity Filling</button>
                    <button className="link link-hover">Teath Whitening</button>
                </div>
                <div>
                    <span className="footer-title">Our Address</span>
                    <button className="link link-hover">New York - 101010 Hudson</button>
                </div>
            </div>
            <div className='mt-20  '>
                <p className='text-center'>Copyright 2022 All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;