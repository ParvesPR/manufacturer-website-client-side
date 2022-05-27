import React from 'react';
import { FaStar } from 'react-icons/fa';

const Review = ({ review }) => {
  const { customerFeedback, name, rating } = review;
  const stars = Array(5).fill(0);
  const colors = {
    orange: "#FFBA5A",
    gray: "#a9a9a9"
  }
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl bg-[#2e262687] text-white font-bold">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{customerFeedback}</p>
        <div className="card-actions justify-center">
          <p className='flex'>
            {
              stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    color={(rating) > index ? colors.orange : colors.gray}
                  />
                )
              })
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;