import React from 'react';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const [updateProfile, updating, UpdatingError] = useUpdateProfile(auth);

    // use REACT QUERY
    const { data: services, isLoading, refetch } = useQuery(['services'], () => fetch(`http://localhost:5000/services`)
        .then(res => res.json())
    )


    /**
    * 3 ways to store images
    * 1. third party storage / not secure for professional : ex: imgbb 
    * 2. your own storage in your own server (file system)
    * 3. database: mongodb
    * 
    * 
   */
    const imgStorageKey = '22d636eb2f45b07be831d4c9cdb9821a'

    const onSubmit = async (data) => {
        console.log('data', data)
        const image = data.image[0]

        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log('imgBB', result)

                if (result.success) {
                    const imgUrl = result.data.url;
                    const doctorDetails = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: imgUrl
                    }

                    fetch(`http://localhost:5000/doctors`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`

                        },
                        body: JSON.stringify(doctorDetails)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            const doctorName = data.doctor?.name
                            // console.log('doctor name',doctorName)
                            if (data.success === true) {
                                Swal.fire({
                                    title: "Success",
                                    text: `Doctor added successfully`,
                                    icon: "success"
                                });
                                reset();
                            }
                            else {
                                Swal.fire({
                                    title: "error",
                                    text: `Doctor ${doctorName} are Already Exist`,
                                    icon: "error"
                                });

                            }
                        })
                }
            })


    }

    if (isLoading) {
        return <Loading></Loading>
    };






    return (
        <section>
            {/* page Header */}
            <div className='flex p-7 '>
                {/* <h1 className='text-3xl flex-1 font-bold'>My Appointment</h1> */}
                <label htmlFor="my-drawer-2" className=" text-xl md:text-3xl flex-1 font-bold ">Add New Doctor</label>
            </div>


            <div className="min-h-screen  flex items-center">
                <div className="card max-w-lg m-auto w-full text-accent font-semibold shadow-2xl bg-base-100">
                    {/* <h1 className='text-center pt-4 text-accent font-bold text-2xl'>Sing Up</h1> */}
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

                            {/* specialist Input field */}
                            <div className="form-control">

                                <label className="label">
                                    <span className="label-text">Specialist</span>
                                </label>


                                <select

                                    className="select w-full select-bordered "
                                    {...register("specialty", {
                                        required: {
                                            value: true,
                                            message: 'specialty is required'
                                        }

                                    })}
                                >
                                    {
                                        services.map(service => <option
                                            key={service._id}
                                            service={service.name}
                                        >{service.name}</option>)
                                    }
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>

                                <input
                                    type="file"

                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'Image is required'
                                        },

                                    })}
                                />

                                <label>
                                    {errors.image?.type === "required" && (
                                        <p className='text-red-500 font-normal' role="alert"><small>{errors.image.message}</small></p>
                                    )}
                                </label>
                            </div>

                            {/* submit button */}
                            <div className="form-control mt-6">
                                <input type="submit" className="btn text-md uppercase btn-accent" value="Add Doctor" />
                            </div>


                        </form>


                    </div>
                </div>

            </div>



        </section >
    );
};

export default AddDoctor;