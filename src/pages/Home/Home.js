import React from 'react';
import Hero from '../../components/Hero/Hero';
import BrandStory from '../../components/BrandStory/BrandStory';
import FeaturedCollections from '../../components/FeaturedCollections/FeaturedCollections';
import CommunityStats from '../../components/CommunityStats/CommunityStats';
import TrustCredentials from '../../components/TrustCredentials/TrustCredentials';
import Newsletter from '../../components/Newsletter/Newsletter';
import ProductShowcase from '../../components/ProductShowcase/ProductShowcase';
import BestsellerShowcase from '../../components/BestsellerShowcase/BestsellerShowcase';

function Home() {
    return React.createElement(React.Fragment, null,
        React.createElement(Hero, null),
        React.createElement(FeaturedCollections, null),
        React.createElement(ProductShowcase, null),
        React.createElement(BestsellerShowcase, null),
        React.createElement(BrandStory, null),
        React.createElement(CommunityStats, null),
        React.createElement(TrustCredentials, null),
        React.createElement(Newsletter, null)
    );
}

export default Home;