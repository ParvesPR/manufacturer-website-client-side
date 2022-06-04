import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Purchase = () => {
    const { id } = useParams();
    const [products, setProducts] = useState({});
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/parts/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [products, id]);
    const handleOrder = event => {
        event.preventDefault();

        const productName = products.name;
        const email = user.email;
        const userName = user.displayName;
        const quantity = event.target.quantity.value;
        const phone = event.target.phone.value;
        const address = event.target.address.value;

        if (quantity < products.minimum || quantity > products.available) {
            setDisable(true)
            toast.error(`Minimum order ${products.minimum} & Maximum order ${products.available}`)
            return;
        }

        const price = quantity * products.price;
        const order = { productName, email, userName, quantity, phone, address, price };

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
    const navigateToOrders = () => {
        navigate('/dashboard/myorders')
    }

    return (
        <section className='px-10 my-10'>
            <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-1 w-11/12 mx-auto'>
                <div className="card lg:max-w-lg  bg-base-100 shadow-xl">
                    <figure><img src={products.image} className="w-3/4" alt="{name}" /></figure>
                    <div className="card-body bg-[#64748B]">
                        <h2 className="font-bold text-yellow-50 text-3xl">{products.name}</h2>
                        <p className='text-gray-200'>{products.description}</p>
                        <p className='font-bold text-slate-100'>Stock: <span className='font-semibold text-yellow-100'>{products.available}</span></p>
                        <p className='font-bold text-slate-100'>Minimum order: <span className='font-semibold text-yellow-100'>{products.minimum}</span></p>
                        <p className='font-bold text-slate-100'>Price: <span className='font-semibold text-yellow-100'>{products.price}</span></p>
                    </div>
                </div>

                <div className="card lg:max-w-lg bg-base-100 shadow-xl">
                    <form onSubmit={handleOrder} className='p-5'>
                        <div>
                            <h2 className='text-2xl font-bold text-center'>Complete Your Order:</h2>
                            <p className='text-purple-400 font-2xl my-3 font-bold text-center'>{products.name}</p>
                        </div>
                        <div className='flex flex-col w-full lg:w-3/4 mx-auto'>
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input name='email' type="email" value={user.email} className="input input-bordered input-info input-md w-full max-w-sm" disabled />
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input name='name' type="name" value={user.displayName} className="input mb-2 input-bordered input-info input-md w-full max-w-sm" disabled />
                            <label class="label">
                                <span class="label-text">Quantity</span>
                            </label>
                            <input name='quantity' type="number" defaultValue={products.minimum} className="input input-bordered input-info input-md w-full max-w-sm" required />
                            <label class="label">
                                <span class="label-text">Address</span>
                            </label>
                            <input name='address' type="text" placeholder='Address' className="input input-bordered input-info input-md w-full max-w-sm" required />
                            <label class="label">
                                <span class="label-text">Phone Number</span>
                            </label>
                            <input name='phone' type="number" placeholder='Phone Number' className="input input-bordered input-info input-md w-full max-w-sm" required />
                            <button disabled={disable} className="btn mt-3 bg-[#64748B] border-none text-white w-full max-w-sm">Order Now</button>
                            <button onClick={navigateToOrders} className="btn mt-3 bg-[#64748B] border-none text-white w-full max-w-sm">Your Order</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default Purchase;