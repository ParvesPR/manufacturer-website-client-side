import React from 'react';

const AllOrders = ({ order, index, refetch }) => {
    const { email, price, productName } = order;
    return (
        <tr>
        <th>{index+1}</th>
        <td>{productName}</td>
        <td>{price}</td>
        <td>{email}</td>
        <td><button className="btn btn-sm">Delete</button></td>
      </tr>
    );
};

export default AllOrders;