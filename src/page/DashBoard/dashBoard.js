import React from 'react';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';

const DashBoard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user)
    return (
        <div className="drawer drawer-mobile bg-[url('/src/assets/images/dash-main.jpg')]">
            <input id="dash-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-12 my-10">
                <h1 className='text-3xl font-bold text-white text-center uppercase'>Welcome to Dashboard</h1>
                <Outlet></Outlet>


            </div>
            <div className="drawer-side">
                <label htmlFor="dash-drawer" className="drawer-overlay "></label>
                <ul className="menu p-4 overflow-y-auto w-80 text-white uppercase bg-[url('/src/assets/images/dashboard.jpg')] ">

                    <li><NavLink className='mt-2 font-black' to="/dashboard/profile">My Profile</NavLink></li>

                    <li>{!admin && <>
                        <NavLink className='mt-2 font-black' to="/dashboard/myorders">My Orders</NavLink>
                        <NavLink className='mt-2 font-black' to="/dashboard/myreview">Add a Reviews</NavLink>
                    </>
                    }</li>

                    <li>{admin && <>
                        <NavLink className='mt-2 font-semibold text-white btn btn-outline' to="/dashboard/users">All Users</NavLink>
                        <NavLink className='mt-2 font-semibold text-white btn btn-outline ' to="/dashboard/manageorders">Manage Orders</NavLink>
                        <NavLink className='mt-2 font-semibold text-white btn btn-outline ' to="/dashboard/manageproducts">Manage Products</NavLink>
                        <NavLink className='mt-2 font-semibold text-white btn btn-outline ' to="/dashboard/addproduct">Add a Product</NavLink>
                    </>
                    }</li>

                </ul>

            </div>
        </div>
    );
};

export default DashBoard;