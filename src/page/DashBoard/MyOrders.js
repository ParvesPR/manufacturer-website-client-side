import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteConfirm from './DeleteConfirm';
import OrderRow from './OrderRow';

const MyOrders = () => {
    const [cancel, setCancel] = useState(null)
    const [user] = useAuthState(auth);

    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`https://salty-tor-00917.herokuapp.com/orders?email=${user.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()).then());

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='font-bold text-white my-5 text-2xl'>My Orders: <span className='text-red-400'>{orders.length}</span></h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra table-compact w-full">

                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Total Price</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <OrderRow
                                key={order._id}
                                index={index}
                                order={order}
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