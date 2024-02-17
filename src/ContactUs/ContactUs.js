import React from 'react';
import Loading from '../Pages/Shared/Loading';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import appointmentBg from '../assets/images/appointment.png';

const ContactUs = () => {
    const { register, formState: { errors }, handleSubmit, } = useForm()


    // use REACT QUERY
    const { data: contact, isLoading, refetch } = useQuery(['contact'], () => fetch(``)
        .then(res => res.json())
    )


    if (isLoading) {
        return <Loading></Loading>
    }


    const onSubmit = async (data) => {
        console.log(data)
    }


    return (
        <section>
            <div style={{ backgroundImage: `url(${appointmentBg})`, backgroundPosition: 'center', backgroundSize: 'cover' }} className='min-h-60 flex items-center justify-center mb-20'>
                <h2 className="text-5xl font-bold text-white">Contact Us</h2>
            </div>
            <div className='grid grid-cols-2 gap-5'>
                <div className=''>
                    <h1>details contact and use map page</h1>
                </div>

                <div className="card max-w-sm m-auto w-full text-accent font-semibold shadow-2xl bg-base-100">
                    <div className='card-body'>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    className="input input-bordered"

                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is required'
                                        },

                                    })}
                                />

                                <label>
                                    {errors.name?.type === "required" && (
                                        <p className='text-red-500 font-normal' role="alert"><small>{errors.name.message}</small></p>
                                    )}
                                </label>
                            </div>



                            {/* Email field */}
                            <div className="form-control">

                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    className="input input-bordered"

                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+[a-z]+\.[a-z]{2,3}/,
                                            message: 'Valid Email is required'
                                        }
                                    })}
                                />

                                <label>
                                    {errors.email?.type === "required" && (
                                        <p className='text-red-500 font-normal' role="alert"><small>{errors.email.message}</small></p>
                                    )}
                                    {errors.email?.type === "pattern" && (
                                        <p className='text-red-500 font-normal' role="alert"><small>{errors.email.message}</small></p>
                                    )}
                                </label>
                            </div>


                            {/* text field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>

                                <textarea
                                    type="text"
                                    placeholder="Your Message"
                                    className="textarea textarea-bordered"

                                    {...register("message", {
                                        required: {
                                            value: true,
                                            message: 'Message is required'
                                        },

                                    })}
                                />

                                <label>
                                    {errors.message?.type === "required" && (
                                        <p className='text-red-500 font-normal' role="alert"><small>{errors.message.message}</small></p>
                                    )}
                                </label>
                            </div>


                            {/* submit button */}
                            <div className="form-control mt-6">
                                <input type="submit" className="btn text-xl btn-accent" value="Submit" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;