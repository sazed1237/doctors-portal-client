import React from 'react';
import doctor from '../../../assets/images/doctor.png';
import appointmentBG from '../../../assets/images/appointment.png';
import PrimaryButton from '../../Shared/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='flex items-center  my-10 lg:mt-36' style={{ backgroundImage: `url(${appointmentBG})` }}>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-150px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 py-5 mx-8 '>
                <h3 className='text-secondary text-xl font-bold'>Appointment</h3>
                <h1 className='text-white text-2xl md:text-3xl py-4'>Make an appointment Today</h1>
                <p className='text-blue-200 pb-4'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                <PrimaryButton>Get started</PrimaryButton>
            </div>
        </section>
    );
};

export default MakeAppointment;