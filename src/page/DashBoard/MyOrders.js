import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/orders?email=${user.email}`)
                .then(res => res.json())
                .then(data => setOrders(data))
        }
    }, [user])
    return (
        <div>
            <h2 className='font-bold text-purple-500 my-5 text-2xl'>My Orders: <span className='text-red-600'>{orders.length}</span></h2>

            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">

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
                            orders.map((order, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{order.productName}</td>
                                <td>${order.price}</td>
                                <td>{order.email}</td>
                                <td><button class="btn btn-sm">Delete</button></td>
                            </tr>)

                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;