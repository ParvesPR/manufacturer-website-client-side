import React, { useEffect, useState } from 'react';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://salty-tor-00917.herokuapp.com/parts')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    return (
        <div className='bg-base-200 px-10'>
            <h3 className='text-3xl font-bold underline p-10'>Featured Products</h3>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default Products;