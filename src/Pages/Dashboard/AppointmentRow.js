import React from 'react';

const AppointmentRow = ({appointment, index}) => {
    const {patientName, treatmentName, date, slot} = appointment
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{patientName}</td>
            <td>{treatmentName}</td>
            <td>{slot}</td>
        </tr>
    );
};

export default AppointmentRow;