import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CheckoutForm = ({ appointment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [CardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transaction, setTransaction] = useState('')

    const { _id, price, patientName, email, treatmentName, } = appointment

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`

            },
            body: JSON.stringify({ price })

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })
    }, [price])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            // console.log('[error]', error);
            setCardError(error.message)
        } else {
            setCardError('')
        }


        // Confirm card payment 
        setSuccess('');
        setProcessing(true)
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: email,

                    },
                },
            },
        );

        if (intentError) {
            setProcessing(false)
            setCardError(intentError?.message)
        }
        else {
            setCardError('')
            console.log(paymentIntent)
            setTransaction(paymentIntent.id)
            setSuccess('Congress your payment is Success');


            // set backend payment info
            const payment = {
                appointment: _id,
                transactionId: paymentIntent.id
            }
            fetch(`http://localhost:5000/bookings/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`

                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setProcessing(false)
                })

            if (paymentIntent.status === "succeeded") {
                Swal.fire({
                    title: "Success!",
                    text: "Your payment is successful.",
                    icon: "success"
                });
            }

        }


    }


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-xs btn-secondary mt-7' type="submit" disabled={!stripe || !clientSecret || success || appointment.paid}>
                    Pay
                </button>
            </form>
            {
                CardError && <small className='text-red-600'>{CardError}</small>
            }
            {
                success && <div>
                    <p className='text-green-600'>{success}</p>
                    <p>Your Transaction Id: <span className='text-orange-600 font-bold'>{transaction}</span></p>
                </div>
            }
        </section>

    );
};

export default CheckoutForm;