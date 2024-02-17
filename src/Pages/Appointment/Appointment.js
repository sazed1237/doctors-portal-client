import React, { useState } from 'react';
import AppointmentBanner from './AppointmentBanner';
import AvailableServices from './AvailableServices';

const Appointment = () => {
    const [date, setDate] = useState(new Date())
    return (
        <div className='max-w-7xl mx-auto'>
            <AppointmentBanner date={date} setDate={setDate} ></AppointmentBanner>
            <AvailableServices date={date}></AvailableServices>
        </div>
    );
};

export default Appointment;