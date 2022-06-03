import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Review from './Review';

const Reviews = () => {
    const [user] = useAuthState(auth)
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/review?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [user])
    return (
        <div className="my-10 text-center bg-[url('/src/assets/images/reviews.jpg')] bg-cover">
            <h2 className='uppercase text-4xl font-bold text-teal-200 py-10'>Whats say our customer!!</h2>
            <div className='flex justify-center items-center py-10'>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        reviews.map(review => <Review
                            key={review._id}
                            review={review}
                        ></Review>)
                    }
                </div>
            </div>
        </div>
    );
};


export default Reviews;