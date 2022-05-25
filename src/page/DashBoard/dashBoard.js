import React from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';

const DashBoard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user)
    return (
        <div className="drawer drawer-mobile">
            <input id="dash-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-12 my-10">
                <h1 className='text-3xl font-bold text-purple-600 text-center uppercase'>Welcome to Dashboard</h1>
                <Outlet></Outlet>


            </div>
            <div className="drawer-side">
                <label htmlFor="dash-drawer" className="drawer-overlay "></label>
                <ul className="menu p-4 overflow-y-auto w-80 text-base-content uppercase bg-accent shadow-xl">

                    <li><NavLink className='mt-2 font-black text-secondary' to="/dashboard/profile">My Profile</NavLink></li>
                    {!admin && <li><NavLink className='mt-2 font-black' to="/dashboard">My Orders</NavLink></li>}
                    {!admin && <li><NavLink className='mt-2 font-black text-secondary' to="/dashboard/review">My Reviews</NavLink></li>}
                    {admin && <li><NavLink className='mt-2 font-black text-secondary' to="/dashboard/manage-orders">Manage Orders</NavLink></li>}
                    {admin && <li><NavLink className='mt-2 font-black text-secondary' to="/dashboard/users">All Users</NavLink></li>}
                    {admin && <li><NavLink className='mt-2 font-black text-secondary' to="/dashboard/manage-products">Manage Products</NavLink></li>}
                    {admin && <li><NavLink className='mt-2 font-black text-secondary' to="/dashboard/add-product">Add a Product</NavLink></li>}
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;