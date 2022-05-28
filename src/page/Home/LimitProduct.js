import React from 'react';
import { useNavigate } from 'react-router-dom';

const LimitProduct = ({product}) => {
    const { _id, image, name, description, minimum, available, price } = product;

    const navigate = useNavigate();

    const navigateToPurchase = id => {
        navigate(`/parts/${id}`)
    }
    return (
        <section className='mb-10'>
            <div className="card lg:max-w-lg min-h-full bg-base-100 shadow-xl">
                <figure>
                    <img className='w-2/4' src={image} alt={name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                    <p>Minium Order: {minimum}</p>
                    <p>Stock: {available}</p>
                    <p>Price: {price}</p>
                    <div className="card-actions justify-center">
                        <button onClick={() => navigateToPurchase(_id)} className="btn btn-primary">Place Order</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LimitProduct;