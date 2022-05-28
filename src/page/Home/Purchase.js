import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const Purchase = () => {
    const { id } = useParams();
    const [products, setProducts] = useState({});
    const [num, setNum] = useState(0);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/parts/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products, id]);

    const incNum = () => {
        if (num < products.available) {
            setNum(Number(num) + 1);
        }
        if (num > products.available) {
            toast.error(`you should order maximum ${products.available}`);

        }
    };
    const decNum = () => {
        if (num > products.minimum) {
            setNum(num - 1);
        };
        if (num < products.minimum) {
            toast.error(`Please order minimum ${products.minimum}`);

        }

    }
    const handleChange = (e) => {
        setNum(e.target.value);
    };

    const totalPrice = parseInt(num) * parseInt(products.price);

    const handleOrder = event => {
        event.preventDefault()
        const order = {
            productName: products.name,
            email: user.email,
            price: totalPrice,
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
        <section className='px-10'>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-16 gap-5'>
                <div className="card my-16 lg:max-w-lg  lg:card-side bg-base-100">
                    <figure>
                        <img className='mx-12 w-2/4 lg:w-full' src={products.image} alt="{products.name}" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-2xl text-purple-400 font-bold mb-4">{products.name}</h2>
                        <p className='text-xl font-bold'>Stock: <span className='text-green-400'>{products.available}</span></p>
                        <p className='text-xl font-bold'>Minimum Order: <span className='text-green-400'>{products.minimum}</span></p>
                        <p className='text-xl font-bold'>Price per unit: <span className='text-green-400'>{products.price}</span></p>
                        <div className="col-xl-1">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-primary" type="button" onClick={decNum}>-</button>
                                </div>
                                <input type="number" className="form-control w-12 text-center" value={num} onChange={handleChange} />
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-primary" type="button" onClick={incNum}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card md:max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-3xl font-bold text-purple-300">Complete Your Order: <span className='text-2xl text-slate-700'>{products.name}</span></h2>

                        <form onSubmit={handleOrder} className='form-control w-full text-xl'>
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Name</span>
                            </label>
                            <input type="text" readOnly value={user.displayName} className="input input-bordered w-full input-sm max-w-xs" />

                            <label className="label">
                                <span className="label-text font-semibold text-lg">Email</span>
                            </label>
                            <input type="email" readOnly value={user.email} className="input input-bordered w-full input-sm max-w-xs" />

                            <label className="label">
                                <span className="label-text font-semibold text-lg">Product Quantity</span>
                            </label>
                            <input type="number" min={products.minimum} max={products.available} name='quantity' readOnly value={num} className="input input-bordered input-sm w-full max-w-xs" />

                            <label className="label">
                                <span className="label-text font-semibold text-lg">Total Price</span>
                            </label>
                            <input type="number" readOnly value={totalPrice} className="input input-bordered input-sm w-full max-w-xs" />

                            <label className="label">
                                <span className="label-text font-semibold text-lg">Address</span>
                            </label>
                            <input type="text" name='address' className="input input-bordered w-full input-sm max-w-xs" required />

                            <label className="label">
                                <span className="label-text font-semibold text-lg">Phone</span>
                            </label>
                            <input type="number" name='phone' className="input input-bordered w-full input-sm max-w-xs mb-4" required />

                            <input disabled={num < products.minimum || num > products.available} type="submit" value="Order" className="btn btn-accent uppercase w-full max-w-xs" />


                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Purchase;