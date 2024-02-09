import { signOut } from 'firebase/auth';
import React from 'react';
import Swal from 'sweetalert2';
import auth from '../../../firebase.init';

const UserRow = ({ user, index, refetch }) => {
    const { email, role } = user;

    const makeAdmin = () => {
        fetch(`http://localhost:5000/users/admin/${email}`, {
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

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
            <td><button class="btn btn-xs">Remove</button></td>
        </tr>
    );
};

export default UserRow;