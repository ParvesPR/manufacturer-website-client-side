import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [loadProfile, setLoadProfile] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {

        const run = async () => {
            await axios.get(`http://localhost:5000/myprofile/${user.email}`,)
                .then(function (res) {
                    setLoadProfile(res.data)
                })

        }
        run()
    }, [loadProfile, user.email])
    return (
        <div className='lg:my-12 card shadow-xl mt-5 mx-10'>
            <div className='flex navbar'>
                <div className='m-5 ml-14'>
                    <h2 className='text-3xl font-semibold  text-purple-500'>My profile</h2>
                </div>
                <div className='ml-24 text-3xl mt-5 navbar-end'>
                    <Link to='profile/editprofile'>
                        <button className='btn btn-primary'>Edit Profile</button>
                    </Link>
                </div>
            </div>
            <hr />
            <div className="card lg:card-side bg-base-100 mb-5 mx-5">
                <figure>
                    <div className="avatar placeholder m-10">
                        <div className="w-40 h-40 mt-5 rounded-full">
                            <img src={loadProfile.img} alt="" />
                        </div>
                    </div>
                </figure>
                <div className="card-body">
                    <div>
                        <h2><span className='text-pink-400 font-bold'>Email:</span> {loadProfile.email}</h2>
                        <br />
                        <h2><span className='text-pink-400 font-bold'>Name:</span> {loadProfile.name}</h2>
                        <br />
                        <h2><span className='text-pink-400 font-bold'>Phone Number:</span> {loadProfile.phoneNumber}</h2>
                        <br />
                        <h2><span className='text-pink-400 font-bold'>Education:</span> {loadProfile.education}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default MyProfile;