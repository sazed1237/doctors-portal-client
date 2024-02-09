import React from 'react';
import ServicesCard from './ServicesCard';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';

const Services = () => {
    return (
        <div className='py-20 px-5 text-center'>
            <div>
                <h3 className='text-lg md:text-xl uppercase text-secondary font-medium'>our services</h3>
                <h1 className='text-2xl md:text-3xl text-accent'>Services We Provide</h1>
            </div>
            <div className='m-auto flex'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6 m-auto '>
                    <ServicesCard img={fluoride} cardTitle="Fluoride Treatment"></ServicesCard>
                    <ServicesCard img={cavity} cardTitle="Cavity Filling"></ServicesCard>
                    <ServicesCard img={whitening} cardTitle="Teeth Whitening"></ServicesCard>
                </div>
            </div>

        </div>
    );
};

export default Services;