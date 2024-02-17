import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentRow = ({ appointment, index }) => {
    const {_id, patientName, treatmentName, date, slot, price, paid } = appointment
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{patientName}</td>
            <td>{treatmentName}</td>
            <td>{slot}</td>
            <td>
                {(price && !paid) && <Link to={`/payment/${_id}`}><button className='btn btn-xs btn-accent' >Pay</button></Link>}
                {(price && paid) && <span className='text-success' >Paid</span>}
            </td>
        </tr>
    );
};

export default AppointmentRow;