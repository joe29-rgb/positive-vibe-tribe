import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../../components/Hero/Hero';
import BrandStory from '../../components/BrandStory/BrandStory';
import FeaturedCollections from '../../components/FeaturedCollections/FeaturedCollections';
import CommunityStats from '../../components/CommunityStats/CommunityStats';
import TrustCredentials from '../../components/TrustCredentials/TrustCredentials';
import Newsletter from '../../components/Newsletter/Newsletter';
import ProductShowcase from '../../components/ProductShowcase/ProductShowcase';
import BestsellerShowcase from '../../components/BestsellerShowcase/BestsellerShowcase';
import AngleSection from '../../components/AngleSection/AngleSection';
import UGCStrip from '../../components/UGCStrip/UGCStrip';

function Home() {
    return React.createElement(React.Fragment, null,
        React.createElement(Helmet, null,
            React.createElement('title', null, 'Positive Vibe Tribe – Indigenous Streetwear'),
            React.createElement('meta', { name: 'description', content: 'Spread positivity with Indigenous-inspired streetwear. Discover apparel woven with the Seven Grandfather Teachings.' }),
            React.createElement('meta', { property: 'og:title', content: 'Positive Vibe Tribe – Indigenous Streetwear' }),
            React.createElement('meta', { property: 'og:description', content: 'Spread positivity with Indigenous-inspired streetwear crafted with purpose.' }),
            React.createElement('meta', { property: 'og:image', content: '/assets/og-share-1200x630.png' }),
            React.createElement('meta', { property: 'og:type', content: 'website' }),
            React.createElement('meta', { name: 'twitter:card', content: 'summary_large_image' }),
            React.createElement('meta', { name: 'twitter:title', content: 'Positive Vibe Tribe – Indigenous Streetwear' }),
            React.createElement('meta', { name: 'twitter:description', content: 'Spread positivity with Indigenous-inspired streetwear crafted with purpose.' }),
            React.createElement('meta', { name: 'twitter:image', content: '/assets/og-share-1200x630.png' })
        ),
        React.createElement(Hero, null),

        React.createElement(AngleSection, { id: 'featured-collections', angleTop: true, angleBottom: true },
            React.createElement(FeaturedCollections, null)
        ),

        React.createElement(AngleSection, { angleBottom: true },
            React.createElement(BrandStory, null)
        ),

        React.createElement(AngleSection, { angleTop: true, angleBottom: true, parallax: true },
            React.createElement(ProductShowcase, null)
        ),

        React.createElement(AngleSection, { angleBottom: true },
            React.createElement(BestsellerShowcase, null)
        ),

        React.createElement(AngleSection, { angleTop: true, angleBottom: true },
            React.createElement(CommunityStats, null)
        ),

        React.createElement(AngleSection, { angleTop: true, angleBottom: true },
            React.createElement(TrustCredentials, null)
        ),

        React.createElement(AngleSection, { angleTop: true, angleBottom: true },
            React.createElement(UGCStrip, null)
        ),

        React.createElement(AngleSection, { angleTop: true },
            React.createElement(Newsletter, null)
        )
    );
}

export default Home;