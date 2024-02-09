import React from 'react';

const InfoCard = ({img, cardTitle ,bgColor}) => {
    return (
        <div className={`card card-side shadow-xl ${bgColor}`}>
            <figure><img className='pl-2' src={img} alt="Movie" /></figure>
            <div className="card-body text-white">
                <h2 className="card-title">{cardTitle}</h2>
                <p>Click the button to watch on Jetflix app.</p>
                
            </div>
        </div>
    );
};

export default InfoCard;