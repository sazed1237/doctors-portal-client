import React from 'react';
import  chair  from "../../assets/images/chair.png";
import  bg  from "../../assets/images/bg.png";
import PrimaryButton from '../Shared/PrimaryButton';

const Banner = () => {
    return (
        <div style={{backgroundImage: `url(${bg})`, }} className="hero min-h-screen ">
            <div className="lg:px-28 md:px-10 hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="md:max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="pr-10 text-3xl md:text-5xl font-bold">Your New Smile Starts Here</h1>
                    <p className="pr-2 py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;