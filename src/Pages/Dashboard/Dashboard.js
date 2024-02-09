import React, { useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';


const Dashboard = () => {
    const [date, setDate] = useState(new Date())

    const formattedDate = format(date, 'PP');
    console.log(formattedDate)

    return (
        <section className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div class="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

                <div class="drawer-content min-h-full bg-base-200 ">
                    {/* page Header */}
                    <div className='flex p-7 '>
                        {/* <h1 className='text-3xl flex-1 font-bold'>My Appointment</h1> */}
                        <label for="my-drawer-2" class=" text-xl md:text-3xl flex-1 font-bold ">My Appointment</label>

                        {/* Calender */}
                        <div class="dropdown dropdown-end">
                            <div tabindex="0" role="button" class="btn m-1">{formattedDate}</div>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-50 md:w-70">
                                <DayPicker
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                />
                            </ul>
                        </div>
                    </div>

                    {/* <!-- Page content here --> */}
                    <div className=' min-h-screen mx-3 md:mx-20 justify-center'>
                        <Outlet></Outlet>
                    </div>
                </div>

                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-60 min-h-full bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to={'/dashboard'}>My Appointment</Link></li>
                        <li><Link to={'/dashboard/reviews'}>My Reviews</Link></li>
                    </ul>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;