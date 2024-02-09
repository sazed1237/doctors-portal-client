import React from 'react';
import treatment from '../../../assets/images/treatment.png';
import PrimaryButton from '../../Shared/PrimaryButton';

const Hero = () => {
    return (
        <div className="hero lg:w-3/4 m-auto py-10 ">
            <div className="hero-content flex-col lg:flex-row">
                <img src={treatment} className="md:max-w-sm rounded-lg shadow-2xl" />
                <div className='md:pl-8'>
                    <h1 className="text-2xl md:text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi 
                    exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>get started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Hero;