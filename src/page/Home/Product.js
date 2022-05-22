import React from 'react';

const Product = ({ product }) => {
    console.log(product)
    const { image, name, description, minimum, available, price } = product;
    return (
        <section>
            <div className="card lg:max-w-lg min-h-full bg-base-100 shadow-xl">
                <figure>
                    <img className='w-2/4' src={image} alt={name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                    <p>{minimum}</p>
                    <p>{available}</p>
                    <p>{price}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Place Order</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;