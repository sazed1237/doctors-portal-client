import React, { useState } from 'react';
import chair from '../../assets/images/chair.png';
import bg from '../../assets/images/bg.png';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({date, setDate}) => {
    

    return (
        <div style={{ backgroundImage: `url(${bg})` }} className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="md:max-w-sm rounded-lg shadow-2xl" alt='dentist chair' />
                <div>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </div>

        </div>
    );
};

export default AppointmentBanner;