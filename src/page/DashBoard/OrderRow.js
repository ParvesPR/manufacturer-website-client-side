import React from 'react';

const OrderRow = ({ order, index, setCancel, refetch }) => {
    const { productName, price, email } = order
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{productName}</td>
            <td>${price}</td>
            <td>{email}</td>
            <td>
                <label onClick={() => setCancel(order)} htmlFor="delete-confirm" className="btn btn-xs btn-error text-white"> Delete</label>
            </td>
        </tr>
    );
};

export default OrderRow;