import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import UserRow from './UserRow';

const Users = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`http://localhost:5000/users`, {
        method: 'GET',
  
        headers: {
            authorization : `Bearer ${localStorage.getItem('accessToken')}`
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
                <label htmlFor="my-drawer-2" className=" text-xl md:text-3xl flex-1 font-bold ">All Users: {users.length}</label>
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
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            users.map((user, index) => <UserRow
                                key={user._id}
                                user={user}
                                index={index}
                                refetch={refetch}
                            ></UserRow>)
                        }

                    </tbody>
                </table>
            </div>


        </section>
    );
};

export default Users;