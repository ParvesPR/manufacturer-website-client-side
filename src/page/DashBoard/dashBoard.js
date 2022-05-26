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
                <ul className="menu p-4 overflow-y-auto w-80 text-white uppercase bg-accent ">

                    <li><NavLink className='mt-2 font-black' to="/dashboard/profile">My Profile</NavLink></li>
                    <NavLink className='mt-2 font-black text-secondary' to="/dashboard/users">All Users</NavLink>

                    <li>{!admin && <>
                        <NavLink className='mt-2 font-black' to="/dashboard/myorders">My Orders</NavLink>
                        <NavLink className='mt-2 font-black' to="/dashboard/myreview">My Reviews</NavLink>
                    </>
                    }</li>

                    <li>{admin && <>
                        <NavLink className='mt-2 font-black text-secondary' to="/dashboard/manageorders">Manage Orders</NavLink>
                        
                        <NavLink className='mt-2 font-black text-secondary' to="/dashboard/manageproducts">Manage Products</NavLink>
                        <NavLink className='mt-2 font-black text-secondary' to="/dashboard/addproduct">Add a Product</NavLink>
                    </>
                    }</li>

                </ul>

            </div>
        </div>
    );
};

export default DashBoard;