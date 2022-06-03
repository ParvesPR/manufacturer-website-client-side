import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const Purchase = () => {
    const { id } = useParams();
    const [products, setProducts] = useState({});
    const { available, image, price, name, minimum, description } = products;
    const [disable, setDisable] = useState(false)
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/parts/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products, id]);

    const handleOrder = event => {
        event.preventDefault()
        const order = {
            productName: products.name,
            email: user.email,

            quantity: event.target.quantity.value,
            phone: event.target.phone.value,
            address: event.target.address.value
        }


        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })

            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Order success. Please check My orders for pay')
                    event.target.reset();
                }
            })
    }


    return (
        <section className='px-10 my-10'>
            <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-1 w-11/12 mx-auto'>
                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <figure><img src={image} className="w-3/4" alt="{name}" /></figure>
                    <div className="card-body">
                        <h2 className="font-bold text-purple-700 text-3xl">{name}</h2>
                        <p>{description}</p>
                        <p className='font-bold text-slate-600'>Stock: <span className='font-semibold text-red-700'>{available}</span></p>
                        <p className='font-bold text-slate-600'>Minimum order: <span className='font-semibold text-red-700'>{minimum}</span></p>
                        <p className='font-bold text-slate-600'>Price: <span className='font-semibold text-red-700'>{price}</span></p>
                    </div>
                </div>

                <div className="card lg:max-w-lg bg-primary text-primary-content">
                    <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Purchase;