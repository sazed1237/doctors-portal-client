import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import AppointmentRow from './AppointmentRow';

const MyAppointment = () => {

    const [user, loading, error] = useAuthState(auth);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/bookings?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setAppointments(data)
                })
        }
    }, [])

    return (
        <section>
            {/* <h1 className='text-center text-xl'>Total Appointment: {appointments.length}</h1> */}
            <div class="overflow-x-auto">
                <table class="table bg-base-100">
                    {/* <!-- head --> */}
                    <thead className='bg-slate-400 text-white'>
                        <tr>
                            <th></th>
                            <th>NAME</th>
                            <th>SERVICE</th>
                            <th>TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            appointments.map((appointment, index) => <AppointmentRow 
                                key={appointment._id}
                                appointment={appointment}
                                index={index}
                            ></AppointmentRow>)
                        }

                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyAppointment;