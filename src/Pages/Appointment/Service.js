import React from 'react';


const Service = ({ service, setTreatment }) => {

    const { name, slots } = service

    return (
        <div className="card mx-10 lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-xl font-medium text-secondary ">{name}</h2>
                <p>{
                    slots.length > 0 ?
                        <span>{slots[0]}</span>
                        :
                        <>
                            <span className='text-red-600'>Try Another Date.</span>
                        </>
                }</p>
                <p><small>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available </small></p>

                <div className="card-actions justify-center">
                    <label
                        htmlFor="booking-modal"
                        disabled={slots.length === 0}
                        className='btn btn-sm border-none uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary'
                        onClick={() => setTreatment(service)}
                    >
                        Book Appointment
                    </label>
                </div>
            </div>

        </div>
    );
};

export default Service;
