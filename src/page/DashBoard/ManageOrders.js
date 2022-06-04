import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import AllOrders from './AllOrders';
import DeleteOrder from './DeleteOrder';

const ManageOrders = () => {
    const [deleteOrder, setDeleteOrder] = useState(null);
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch('http://localhost:5000/allorders', {
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
            <h2 className='font-bold text-white my-5 text-2xl text-center'>All Orders: {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Products Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Delivery</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <AllOrders
                                key={order._id}
                                order={order}
                                index={index}
                                setDeleteOrder={setDeleteOrder}
                                refetch={refetch}
                            ></AllOrders>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deleteOrder && <DeleteOrder
                    deleteOrder={deleteOrder}
                    refetch={refetch}
                    setDeleteOrder={setDeleteOrder}
                ></DeleteOrder>
            }
        </div>
    );
};

export default ManageOrders;