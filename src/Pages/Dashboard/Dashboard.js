import React, { useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const Dashboard = () => {
    const [user] = useAuthState(auth)
    const [admin] = useAdmin(user)
    return (
        <section className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content min-h-full bg-base-200 ">


                    {/* <!-- Page content here --> */}
                    <div className=' min-h-screen mx-3 md:mx-20 justify-center'>
                        <Outlet></Outlet>
                    </div>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 min-h-full bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><Link to={'/dashboard'}>My Appointment</Link></li>
                        <li><Link to={'/dashboard/reviews'}>My Reviews</Link></li>
                        {admin && <li><Link to={'/dashboard/users'}>All Users</Link></li>}
                        {admin && <li><Link to={'/dashboard/add-doctors'}>Add a Doctor</Link></li>}
                        {admin && <li><Link to={'/dashboard/manage-doctor'}>Manage Doctor</Link></li>}
                    </ul>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;