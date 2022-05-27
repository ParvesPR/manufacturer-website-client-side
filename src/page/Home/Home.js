import React from 'react';
import Section1 from '../Section1/Section1';
import Banner from './Banner';
import Products from './Products';
import BusinessSummary from '../BusinessSummary/BusinessSummary';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <BusinessSummary></BusinessSummary>
            <Section1></Section1>
        </div>
    );
};

export default Home;