import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const Purchase = () => {
    const { id } = useParams();
    const [products, setProducts] = useState({});
    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();

    let cost;
    let minimum;
    let totalPrice;
    useEffect(() => {
        fetch(`http://localhost:5000/parts/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [id]);

    const onSubmit = data => {
        cost = products.price;
        minimum = data.minimum;
        totalPrice = cost * minimum;
        console.log(data)
    }


    return (
        <section className='px-10'>
            <div className="h ero min-h-screen bg-base-100">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold">Product Name: <span className='text-purple-500'>{products.name}</span>
                        </h1>
                        <img className='w-48' src={products.image} alt="" />
                        <p className="py-4">{products.description}</p>
                        <div>
                            <p className='text-lg font-bold text-red-700'>Min. Order: <span classNameName='text-slate-400'>{products.minimum} pcs.</span></p>
                            <p className='text-lg font-bold text-red-700'>Stock: <span className='text-lg font-bold text-purple-500'>{products.available}</span></p>
                            <p className='text-lg font-bold text-red-700'>Price: <span className='text-lg font-bold text-gray-500'>${products.price}</span></p>
                        </div>
                    </div>
                    <form className='mx-auto p-6 card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                value={user.displayName}
                                type="name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name")}
                                readOnly />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                value={user.email}
                                type="email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email")}
                                readOnly />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Minimum Order</span>
                            </label>

                            <input
                                min={products.minimum}
                                max={products.available}
                                type="number"
                                placeholder='55'
                                className="input input-bordered w-full max-w-xs"
                                {...register("minimum")}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder='Your Address'
                                className="input input-bordered w-full max-w-xs"
                                {...register("address")}
                                required />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Phone No.</span>
                            </label>
                            <input
                                type="number"
                                placeholder='Your Number'
                                className="input input-bordered w-full max-w-xs"
                                {...register("phone")}
                                required />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="text"
                               value={products.price}
                                placeholder='Price'
                                className="input input-bordered w-full max-w-xs"
                                {...register("price")}
                                required />
                        </div>
                        <input type="submit" value="Order" className='btn btn-accent mt-3' />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Purchase;