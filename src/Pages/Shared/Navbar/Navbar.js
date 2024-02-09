import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';

const Navbar = () => {

    const [user, loading, error] = useAuthState(auth);
    


    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken')
    };



    const navItems = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/appointment'}>Appointment</Link></li>
        <li><Link to={'/reviews'}>Reviews</Link></li>
        <li><Link to={'/about'}>About</Link></li>
        <li><Link to={'/contact'}>Contact us</Link></li>

        {
            user && <li><Link to={'/dashboard'}>Dashboard</Link></li>
        }

        {/* <li>{user ?
            <Link onClick={logout}>Log out</Link>
            :
            <Link to={'/login'}>Login</Link>}</li> */}
    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><line strokeLinecap="round" x1="0" y1="0" x2="100" y2="100" /></svg>
                    </div>
                    <ul tabIndex="0" className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                        {navItems}

                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl">Doctors Portal</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>


            {/* profile */}
            <div className='lg:ml-20'>

                {
                    user ?

                        <div className="dropdown dropdown-end">
                            <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex="0" className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={logout}>Logout</a></li>
                            </ul>
                        </div>
                        :
                        <button className='btn btn-sm btn-accent'>
                            <Link to={'/login'}>Login</Link>
                        </button>
                }
            </div>


        </div>
    );
};

export default Navbar;