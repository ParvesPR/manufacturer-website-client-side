import React from 'react';

const AllProducts = ({ index, product, setManageProduct }) => {
    const { image, name, price } = product
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <div className="avatar">
                    <div className="w-16 rounded-full">
                        <img src={image} alt={name} />
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{price}</td>
            <td>
            <label onClick={() => setManageProduct(product)} htmlFor="delete-product" className="btn btn-xs btn-error text-white">Delete Product</label>
            </td>
        </tr>
    );
};

export default AllProducts;