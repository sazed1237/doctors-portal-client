import React from 'react';
import Banner from './Banner';
import Info from './Info/Info';
import Services from './Services/Services';
import Hero from './Hero/Hero';
import MakeAppointment from './MakeAppointment/MakeAppointment';
import Testimonial from './Testimonial/Testimonial';
import ContactUs from './ContactUs/ContactUs';
import Footer from '../Shared/Footer/Footer';

const Home = () => {
    return (
        <div >
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <Hero></Hero>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;