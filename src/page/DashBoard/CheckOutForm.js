import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOutForm = ({ parts }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false)
    const [cardError, setCardError] = useState('');
    const [cardSuccess, setCardSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('')

    const { _id, price, email } = parts;

    useEffect(() => {
        fetch('https://salty-tor-00917.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })
    }, [price])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        setCardError(error?.message || '');

        setCardSuccess('')
        setProcessing(true)
        //confirm payment with card
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: email

                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false)

        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setCardSuccess('Hey, Your Payment is Done!')

            //send to db
            const payment = {
                parts: _id,
                transactionId: paymentIntent.id

            }
            fetch(`https://salty-tor-00917.herokuapp.com/product/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            }).then(res => res.json())
                .then(data => {
                    setProcessing(false)
                    console.log(data);
                })
        }

    }
    return (
        <>
            <form className='bg-white' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#000',
                                '::placeholder': {
                                    color: '#000',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success btn-xs mt-4 text-white' type="submit" disabled={!stripe || !clientSecret || cardSuccess}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-600'>{cardError}</p>
            }
            {
                cardSuccess && <div className='text-green-600 font-bold'>
                    <p className='uppercase'>{cardSuccess}</p>
                    <p className='text-black'>Your Trans. Id: <small className='font-bold text-orange-500'>{transactionId}</small></p>
                </div>
            }
        </>
    );
};

export default CheckOutForm;