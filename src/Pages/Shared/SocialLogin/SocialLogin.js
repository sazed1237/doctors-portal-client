
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';


const SocialLogin = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const location = useLocation()
    const navigate = useNavigate()

    // created hooks for user PUT methods
    const [token] = useToken(user)


    const from = location.state?.from?.pathname || "/";


    let singInError;

    useEffect(() => {
        if (token) {
            console.log(token)
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])



    if (error) {
        singInError = <p className='text-red-500 text-center text-sm'>{error?.message}</p>

    }

    if (loading) {
        return <Loading></Loading>;
    }


    return (
        <div className="form-control">
            <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline btn-sm text-md font-normal text-accent bg-none uppercase">
                continue with google
            </button>
            {singInError}
        </div>
    );
};

export default SocialLogin;