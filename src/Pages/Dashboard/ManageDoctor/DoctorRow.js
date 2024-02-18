import React from 'react';
import Swal from 'sweetalert2';

const DoctorRow = ({ doctor, index, refetch }) => {

    const { _id, name, specialty, email, role, img } = doctor
    // console.log(doctor)


    const handleDelete = (id) => {
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: `You won't to Delete Doctor ${name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://doctors-portal-server-three-zeta.vercel.app/doctor/${id}`, {
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
                                text: "Doctor has been deleted.",
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
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt={name} />
                        </div>
                    </div>
                </div>
            </td>
            <td className='font-bold'>
                {name}
                <br />
                <span className="badge font-normal badge-ghost badge-sm">{email}</span>
            </td>
            <td>{specialty}</td>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-accent btn-xs">Remove Doctor</button>
            </th>
        </tr>
    );
};

export default DoctorRow;