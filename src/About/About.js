import React from 'react';
import appointmentBg from '../assets/images/appointment.png';


const About = () => {
    return (
        <section>
            <div style={{ backgroundImage: `url(${appointmentBg})`, backgroundPosition: 'center', backgroundSize: 'cover' }} className='min-h-60 flex items-center justify-center mb-20'>
                <h2 className="text-5xl font-bold text-white">About Us</h2>
            </div>
            <h2>about is coming soon</h2>
        </section>
    );
};

export default About;