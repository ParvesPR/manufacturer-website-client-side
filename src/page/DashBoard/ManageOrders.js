import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import AllOrders from './AllOrders';

const ManageOrders = () => {
    const { data: orders, isLoading, refetch } = useQuery('order', () => fetch('http://localhost:5000/allorders', {
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
            <h2 className='font-bold text-slate-500 my-5 text-2xl text-center'>All Orders: {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>User</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <AllOrders
                                key={order._id}
                                order={order}
                                index={index}
                                refetch={refetch}
                            ></AllOrders>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;