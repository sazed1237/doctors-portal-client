import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import UserRow from './UserRow';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

const Users = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch(`http://localhost:5000/users`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 403 || res.status === 401) {
            signOut(auth);
            localStorage.removeItem('accessToken')

            Swal.fire({
                title: "Failed!",
                text: `forbidden access`,
                icon: "error"
            });
        }
        return res.json()
    }))

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <section>
            {/* page Header */}
            <div className='flex p-7 '>
                {/* <h1 className='text-3xl flex-1 font-bold'>My Appointment</h1> */}
                <label for="my-drawer-2" class=" text-xl md:text-3xl flex-1 font-bold ">All Users: {users.length}</label>
            </div>

            <div class="overflow-x-auto">
                <table class="table bg-base-100">
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