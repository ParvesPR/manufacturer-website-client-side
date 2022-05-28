import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import User from './User';

const Users = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://salty-tor-00917.herokuapp.com/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='font-bold text-white text-center my-5 text-2xl'>All Users: <span className='text-red-400'>{users.length}</span></h2>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>User Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <User
                                key={user._id}
                                user={user}
                                refetch={refetch}
                            ></User>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;