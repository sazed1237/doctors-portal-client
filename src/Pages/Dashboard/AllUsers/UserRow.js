import { signOut } from 'firebase/auth';
import React from 'react';
import Swal from 'sweetalert2';
import auth from '../../../firebase.init';

const UserRow = ({ user, index, refetch }) => {
    const { _id, email, role } = user;
    // console.log('userRow', user)

    const makeAdmin = () => {
        fetch(`https://doctors-portal-server-three-zeta.vercel.app/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403 || res.status === 401) {
                    signOut(auth);
                    localStorage.removeItem('accessToken')

                    Swal.fire({
                        title: "Failed!",
                        text: `failed to make an admin`,
                        icon: "error"
                    });
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success",
                        text: `Successfully made an admin: ${email}`,
                        icon: "success"
                    });
                }
                refetch()
            })

    }


    const handleDelete = (id) => {
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: `You won't to Delete user ${email}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://doctors-portal-server-three-zeta.vercel.app/user/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization : `Bearer ${localStorage.getItem('accessToken')}`
                    }

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)

                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch()
                    })
            }
        });
    }


    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>}</td>
            <td><button onClick={() => handleDelete(_id)} className="btn btn-xs">Remove</button></td>
        </tr>
    );
};

export default UserRow;