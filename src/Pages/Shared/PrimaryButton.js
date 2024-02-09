import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryButton = ({ children }) => {
    return (
        <div>
            <Link to={'/appointment'}>
                <button className="btn border-none uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary">{children}</button>
            </Link>
        </div>
    );
};

export default PrimaryButton;