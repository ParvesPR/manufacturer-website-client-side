import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Purchase = () => {
    const { id } = useParams();
    const [products, setProducts] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [id])
    return (
        <div>
            <h2 className='text-purple-500 text-3xl'>Complete Your Order: {products.name}</h2>
        </div>
    );
};

export default Purchase;