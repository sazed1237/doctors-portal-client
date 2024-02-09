import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { useForm } from "react-hook-form"
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';


const SingUp = () => {
    const { register, formState: { errors }, handleSubmit, } = useForm()
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, UpdatingError] = useUpdateProfile(auth);
    const navigate = useNavigate()


    let singInError;
    if (error || UpdatingError) {
        singInError = <p className='text-red-500 text-center text-sm'>{error?.message || UpdatingError.message}</p>

    }

    if (loading || updating) {
        return <Loading></Loading>
    }

    if (user) {
        console.log(user)
    }


    const onSubmit = async (data) => {
        console.log(data)
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({displayName: data.name})
        navigate('/')
    }


    return (
        <section className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className="min-h-screen  flex items-center">
                <div className="card max-w-sm m-auto w-full text-accent font-semibold shadow-2xl bg-base-100">
                    <h1 className='text-center pt-4 text-accent font-bold text-2xl'>Sing Up</h1>
                    <div className="card-body">

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

                            {/* password Input field */}
                            <div className="form-control">

                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered"

                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'password is required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                                />

                                <label>
                                    {errors.password?.type === "required" && (
                                        <p className='text-red-500 font-normal' role="alert"><small>{errors.password.message}</small></p>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <p className='text-red-500 font-normal' role="alert"><small>{errors.password.message}</small></p>
                                    )}
                                </label>
                                <label>
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            {/* submit button */}
                            <div className="form-control mt-6">
                                <input type="submit" className="btn text-xl btn-accent" value="Sing Up" />
                            </div>

                            {singInError}
                        </form>

                        <div>
                            <p className='text-center'><small>Already Have an Account? <Link to={'/login'} className='text-secondary'>Login</Link></small></p>
                            <div className="divider">OR</div>
                            <SocialLogin></SocialLogin>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SingUp;