import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteConfirm from './DeleteConfirm';
import OrderRow from './OrderRow';

const MyOrders = () => {
    const [cancel, setCancel] = useState(null)
    const [user] = useAuthState(auth);

    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`http://localhost:5000/orders?email=${user.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()).then());

    if (isLoading) {
        return <Loading></Loading>
    }


    // useEffect(() => {
    //     if (user) {
    //         fetch(`http://localhost:5000/orders?email=${user.email}`, {
    //             method: 'GET',
    //             headers: {
    //                 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         })
    //             .then(res => {
    //                 if (res.status === 401 || res.status === 403) {
    //                     signOut(auth);
    //                     localStorage.removeItem('accessToken');
    //                     navigate('/')
    //                 }
    //                 return res.json()
    //             })
    //             .then(data => setOrders(data))
    //     }
    // }, [navigate, user])
    return (
        <div>
            <h2 className='font-bold text-purple-500 my-5 text-2xl'>My Orders: <span className='text-red-600'>{orders.length}</span></h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Total Price</th>
                            <th>Email</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <OrderRow
                                key={order._id}
                                index={index}
                                order={order}
                                refetch={refetch}
                                setCancel={setCancel}
                            ></OrderRow>)

                        }

                    </tbody>
                </table>
            </div>
            {cancel && <DeleteConfirm
                cancel={cancel}
                refetch={refetch}
                setCancel={setCancel}
            ></DeleteConfirm>}
        </div>
    );
};

export default MyOrders;