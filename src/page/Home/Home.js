import React from 'react';
import Section1 from '../Section1/Section1';
import Banner from './Banner';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import Reviews from '../Reviews/Reviews';
import Contact from './Contact';
import HomeProducts from './HomeProducts';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeProducts></HomeProducts>
            <BusinessSummary></BusinessSummary>
            <Reviews></Reviews>
            <Section1></Section1>
            <Contact></Contact>
        </div>
    );
};

export default Home;