import React from 'react';

const ServicesCard = ({ img, cardTitle }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{cardTitle}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores fuga quam sunt commodi deserunt provident?</p>
            </div>
        </div>
    );
};

export default ServicesCard;