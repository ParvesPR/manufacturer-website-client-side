import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ order, index, setCancel }) => {
    const { productName, price, email, _id } = order
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{productName}</td>
            <td>${price}</td>
            <td>{email}</td>
            <td>
                {(price && !order.paid) && <Link to={`/dashboard/payment/${_id}`}> <button className='btn btn-xs btn-success'>Pay</button></Link>}
                {(price && order.paid) &&
                    <button className='btn btn-sm btn-success text-white' disabled>Paid</button>}
            </td>
            <td>
                {(price && !order.paid) &&
                    <label onClick={() => setCancel(order)} htmlFor="delete-confirm" className="btn btn-xs btn-error text-white"> Delete</label>
                }
                {(price && order.paid) &&
                    <p className='font-semibold text-slate-700'>Transaction Id: <span className='font-semibold text-red-700'>{order.transactionId}</span></p>
                }
            </td>
        </tr>
    );
};

export default OrderRow;