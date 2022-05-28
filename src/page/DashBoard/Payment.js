import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe('pk_test_51L3yctBfaPodgnMk9Qf1cRhBl3WolsCEFqw9FAdedZUXRJoahZmnkh0taI8DRpM7sSNnSMW1UV1pSbwKPKCvuUE6004olGTXz4');
const Payment = () => {
    const { id } = useParams();
    const { data: parts, isLoading } = useQuery(['Order', id], () => fetch(`https://salty-tor-00917.herokuapp.com/product/${id}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    console.log(parts)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='flex justify-center items-center'>
            <div>
                <div className="card w-50 max-w-md bg-blue-200 shadow-xl my-10 text-black">
                    <div className="card-body">
                        <h1 className='text-blue-700 uppercase font-bold'>Hello, {parts.email}</h1>
                        <h2 className="card-title">Pay for {parts.productName}</h2>
                        <p>Your Delivery Done by us, within: 30 days.</p>
                        <div className="card-actions justify-end">
                            <p>Please Pay : ${parts.price}</p>

                        </div>
                    </div>
                </div>
                <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-blue-200 text-black">
                    <div className="card-body bg-white">
                        <Elements stripe={stripePromise}>
                            <CheckOutForm parts={parts} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default Payment;