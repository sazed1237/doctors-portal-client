import React, { useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';
import AppointmentBanner from './AppointmentBanner';
import AvailableServices from './AvailableServices';

const Appointment = () => {
    const [date, setDate] = useState(new Date())
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <AppointmentBanner date={date} setDate={setDate} ></AppointmentBanner>
            <AvailableServices date={date}></AvailableServices>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;