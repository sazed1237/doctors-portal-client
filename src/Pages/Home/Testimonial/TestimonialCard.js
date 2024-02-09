import React from 'react';

const TestimonialCard = ({ review }) => {
    const { _id, name, reviewText, photo, address } = review;
    return (
        <div className="card  bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{reviewText}</p>
                <div className="card-actions mt-3 justify-center">
                    <img className='w-16' src={photo} alt="" />
                    <div>
                        <h2 className="card-title">{name}</h2>
                        <p>{address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;