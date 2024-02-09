import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import TestimonialCard from './TestimonialCard';

const Testimonial = () => {

    const reviews = [
        {
            _id: 1,
            name: "winson Herry",
            address: "California",
            photo: people1,
            reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto aut quas modi fuga quia! Necessitatibus omnis cum maxime quis quidem."
        },
        {
            _id: 2,
            name: "winson Herry",
            address: "California",
            photo: people2,
            reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto aut quas modi fuga quia! Necessitatibus omnis cum maxime quis quidem."
        },
        {
            _id: 3,
            name: "winson Herry",
            address: "California",
            photo: people3,
            reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto aut quas modi fuga quia! Necessitatibus omnis cum maxime quis quidem."
        },
    ]

    return (
        <section className='px-10 py-10'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='text-secondary text-xl font-bold'>Testimonial</h4>
                    <h1 className='text-2xl md:text-3xl'>What Our Patients Says</h1>
                </div>
                <div className=' w-24 lg:w-48'>
                    <img src={quote} alt="" />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {
                    reviews.map(review => <TestimonialCard 
                    key={review._id}
                    review={review}
                    ></TestimonialCard>)
                }
            </div>

        </section>
    );
};

export default Testimonial;