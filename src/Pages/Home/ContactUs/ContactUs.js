import React from 'react';
import appointmentBG from '../../../assets/images/appointment.png';
import PrimaryButton from '../../Shared/PrimaryButton';

const ContactUs = () => {
    return (
        <div style={{ backgroundImage: `url(${appointmentBG})` }} className="hero mt-20 py-6">
            <div className="hero-content">
                <div>
                    <div className='text-center'>
                        <h3 className='text-secondary text-lg font-bold'>Contact Us</h3>
                        <h1 className="text-3xl text-white">Stay Connected With us</h1>
                    </div>
                    <form className="card-body">
                        <div className="form-control">
                            <input type="email" placeholder="Email Address" className="input input-sm md:w-80 input-bordered" required />
                        </div>
                        <div className="form-control">
                            <input type="text" placeholder="Subject" className="input input-sm md:w-80 input-bordered" required />
                        </div>
                        <div>
                            <textarea placeholder="Your Message" className="textarea textarea-bordered md:w-80 textarea-sm w-full" ></textarea>
                        </div>
                        <div>
                            <PrimaryButton>
                                <input type="submit" value="Submit" />
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;