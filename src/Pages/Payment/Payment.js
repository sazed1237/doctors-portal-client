import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51NWkvMBfMqMFvlg46yUDorQ4iWg5YWHnXnv2BNXjVFLqgNhHTKKfxvSemd04ixDxQz22kYeYd3pATpiD3tvYwJpV00LVG3ggJr');

const Payment = () => {

    const { id } = useParams()

    const { data: appointment, isLoading, refetch } = useQuery(['bookings', id], () => fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'GET',
  
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    // const {  patientName, treatmentName, date, slot, price, paid } = appointment


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section className='max-w-7xl mx-auto'>
            <Navbar></Navbar>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='md:w-96 p-2'>
                        <h3 className='text-secondary font-semibold '>Hello, {appointment.patientName}</h3>
                        <h1 className='text-xl'>Please Pay for <span className='font-bold'>{appointment.treatmentName}</span> </h1>
                        <p>Your Appointment : <span className='text-orange-600'>{appointment.date}</span> at {appointment.slot}</p>
                        <h2>Please Pay: ${appointment.price}</h2>
                    </div>

                    <div className="card w-full md:w-96 shadow-2xl bg-base-100 ">
                        <div className="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm appointment={appointment} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Payment;