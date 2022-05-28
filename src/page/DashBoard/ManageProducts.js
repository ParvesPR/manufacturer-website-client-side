import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import AllProducts from './AllProducts';
import DeleteProduct from './DeleteProduct';

const ManageProducts = () => {
    const [manageProduct, setManageProduct] = useState(null)
    const { data: products, isLoading, refetch } = useQuery('manage', () => fetch('https://salty-tor-00917.herokuapp.com/manageproducts', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()).then());

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='font-bold text-white my-5 text-2xl text-center'>All Products: {products.length}</h2>

            <div className="overflow-x-auto">

                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => <AllProducts
                                key={product._id}
                                product={product}
                                index={index}
                                refetch={refetch}
                                setManageProduct={setManageProduct}
                            ></AllProducts>)
                        }
                    </tbody>
                </table>
            </div>
            {manageProduct && <DeleteProduct
                manageProduct={manageProduct}
                setManageProduct={setManageProduct}
                refetch={refetch}
            ></DeleteProduct>}
        </div>
    );
};

export default ManageProducts;