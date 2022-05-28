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
            await axios.get(`https://salty-tor-00917.herokuapp.com/myprofile/${user.email}`,)
                .then(function (res) {
                    setLoadProfile(res.data)
                })

        }
        run()
    }, [loadProfile, user.email])
    return (
        <div className='lg:my-12 card shadow-xl mt-5 mx-10 bg-[#02403b61]'>
            <div className='flex navbar'>
                <div className='m-5 ml-14'>
                    <h2 className='text-3xl font-semibold  text-purple-500'>My profile</h2>
                </div>
                <div className='ml-24 text-3xl mt-5 navbar-end'>
                    <Link to='/dashboard/profile/editprofile'>
                        <button className='btn btn-primary'>Edit Profile</button>
                    </Link>
                </div>
            </div>
            <hr />
            <div className="card lg:card-side bg-[#02403b61] mb-5 mx-5">
                <figure>
                    {loadProfile.img &&
                        <div className="avatar placeholder m-10">
                            <div className="w-40 h-40 mt-5 rounded-full">
                                <img src={loadProfile.img} alt="" />
                            </div>
                        </div>
                    }
                    {!loadProfile.img &&
                        <div className="avatar placeholder m-10">
                            <div className="w-40 h-40 mt-5 rounded-full">
                                <p className='font-bold text-white'>image not found</p>
                            </div>
                        </div>
                    }
                </figure>
                <div className="card-body">
                    <div>
                        <h2 className='text-white font-bold'>Email: <span className='text-purple-400'> {loadProfile.email}</span> </h2>
                        <br />
                        <h2 className='text-white font-bold'>Name: <span className='text-purple-400' > {loadProfile.name}</span></h2>
                        <br />
                        <h2 className='text-white font-bold'>Phone Number:
                            <span className='text-purple-400'> {loadProfile.phoneNumber}</span> </h2>
                        <br />
                        <h2 className='text-white font-bold'>Education:  <span className='text-purple-400'>{loadProfile.education}</span></h2>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default MyProfile;