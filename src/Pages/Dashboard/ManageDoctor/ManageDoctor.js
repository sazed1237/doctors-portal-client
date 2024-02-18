import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import DoctorRow from './DoctorRow';

const ManageDoctor = () => {

    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('https://doctors-portal-server-three-zeta.vercel.app/doctors', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            {/* page Header */}
            <div className='flex p-7 '>
                {/* <h1 className='text-3xl flex-1 font-bold'>My Appointment</h1> */}
                <label htmlFor="my-drawer-2" className=" text-xl md:text-3xl flex-1 font-bold ">Manage Doctor: {doctors.length}</label>
            </div>

            <div className="overflow-x-auto">
                <table className="table bg-base-100">
                    {/* <!-- head --> */}
                    <thead className='bg-slate-400 text-white'>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <DoctorRow
                                key={doctor._id}
                                doctor={doctor}
                                index={index}
                                refetch={refetch}

                            ></DoctorRow>)
                        }
                    </tbody>



                </table>
            </div>


        </section>
    );
};

export default ManageDoctor;