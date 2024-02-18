import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import AppointmentRow from './AppointmentRow';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';

const MyAppointment = () => {

    const [date, setDate] = useState(new Date())

    const [user, loading, error] = useAuthState(auth);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate()

    const formattedDate = format(date, 'PP');
    console.log(formattedDate)


    useEffect(() => {
        if (user) {
            fetch(`https://doctors-portal-server-three-zeta.vercel.app/bookings?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(res => {
                    console.log('res', res)
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken')
                        return navigate('/')
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    setAppointments(data)
                })
        }
    }, [])

    return (
        <section>
            {/* <h1 className='text-center text-xl'>Total Appointment: {appointments.length}</h1> */}
            {/* page Header */}
            <div className='flex p-7 '>
                {/* <h1 className='text-3xl flex-1 font-bold'>My Appointment</h1> */}
                <label htmlFor="my-drawer-2" className=" text-xl md:text-3xl flex-1 font-bold ">My Appointment</label>

                {/* Calender */}
                <div className="dropdown dropdown-end">
                    <div tabIndex="0" role="button" className="btn m-1">{formattedDate}</div>
                    <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-50 md:w-70">
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                        />
                    </ul>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table bg-base-100">
                    {/* <!-- head --> */}
                    <thead className='bg-slate-400 text-white'>
                        <tr>
                            <th></th>
                            <th>NAME</th>
                            <th>SERVICE</th>
                            <th>TIME</th>
                            <th>PAYMENT</th>
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