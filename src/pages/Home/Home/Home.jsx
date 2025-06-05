import React from 'react';
import PublishersSection from './PublishersSection';
import StatisticsSection from './StatisticsSection';
import PlansSection from './PlansSection';

const Home = () => {
    return (
        <div className='space-y-5'>
            <PublishersSection />
            <StatisticsSection />
            <PlansSection />
        </div>
    );
};

export default Home;