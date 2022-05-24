import React from 'react';
import logo from '../../assets/images/logo.png';

const Footer = () => {
    return (
        <footer
            className="p-10 text-white mx-auto bg-slate-600">
            <div className='footer justify-between'>
                <div className='w-64'>
                    <img src={logo} alt="" />
                    <p>
                        Apar - Auto Parts Manufacturer - WooCommerce
                        Apar is an auto parts Manufacturer. APAR is suitable for auto parts, Body Parts, Headlights & Lighting, Brakes & Suspension, Engine & Drivetrain, Tools & Garage, and more.</p>
                </div>
                <div>
                    <span className="footer-title">Help & Support</span>
                    <button className="link link-hover">Wishlist</button>
                    <button className="link link-hover">My Account</button>
                    <button className="link link-hover">Location</button>
                    <button className="link link-hover">FAQ</button>
                </div>
                <div>
                    <span className="footer-title">About US</span>
                    <button className="link link-hover">Partners</button>
                    <button className="link link-hover">Contact us</button>
                    <button className="link link-hover">Product Recall</button>
                    <button className="link link-hover">Shipping</button>
                </div>
                <div>
                    <span className="footer-title">Our Address</span>
                    <button className="link link-hover">New York - 101010 Hudson</button>
                    <button className="link link-hover">Phone: +(48) 880 456 789</button>
                    <button className="link link-hover">Email: help.apar@gmail.com</button>
                </div>
            </div>
            <div className='mt-20  '>
                <p className='text-center'>Copyright 2022 <span className='text-red-300'>APAR</span> All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;