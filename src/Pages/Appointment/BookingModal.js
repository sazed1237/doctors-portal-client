import React from 'react';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';


const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
    const [user, loading, error] = useAuthState(auth);
    const { _id, name, slots, price } = treatment;

    const handleBooking = event => {
        event.preventDefault()

        const form = event.target;
        const formatedDate = form.date.value;
        const slot = form.slot.value;
        const displayName = form.name.value;
        const number = form.number.value;
        const email = form.email.value;

        const booking = {
            treatmentId: _id,
            treatmentName: name,
            patientName: displayName,
            date: format(date, 'PP'),
            slot,
            price,
            number,
            email
        }
        // console.log(_id, name, booking)

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    Swal.fire({
                        title: "Success",
                        text: `Your appointment is set in ${formatedDate} at ${slot}`,
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "error",
                        text: `You have already an appointment on ${data.booking?.date} at ${data.booking?.slot}`,
                        icon: "error"
                    });
                }
                refetch()
                setTreatment(null)
            })


    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className='modal-toggle' />
            <div className="modal modal-bottom sm:modal-middle">

                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <form onSubmit={handleBooking}>
                        <div>
                            <input type="text" name='date' className="input input-bordered input-md w-full mt-10" disabled value={format(date, 'PP')} />

                            <select name='slot' className="select select-bordered w-full mt-4">
                                {
                                    slots.map((slot, index) => <option
                                        key={index}
                                        value={slot}
                                    >
                                        {slot}
                                    </option>)
                                }
                            </select>

                            <input type="text" name='name' placeholder="Enter Name" defaultValue={user?.displayName} className="input input-bordered input-md w-full mt-4" />

                            <input type="number" name='number' placeholder="Phone Number" className="input input-bordered input-md w-full mt-4" />

                            <input type="email" name='email' placeholder="Email" defaultValue={user?.email} className="input input-bordered input-md w-full mt-4" />
                        </div>
                        <div className="modal-action">
                            <input type="submit" className=' btn btn-block bg-accent text-white uppercase' value="Submit" />
                            {/* <label htmlFor="booking-modal" className='btn'>ok</label> */}
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
};

export default BookingModal;