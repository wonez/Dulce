import React from 'react';

import Entry from './Entry/Entry';
import MostPopular from './MostPopular/MostPopular';
import LearnMore from './LearnMore/LearnMore';
import Footer from './Footer/Footer';

import Aux from '../../hoc/Aux';

const Landing = () => (
    <Aux>
        <Entry />
        <MostPopular />
        <LearnMore />
        <Footer />
    </Aux>
);

export default Landing;