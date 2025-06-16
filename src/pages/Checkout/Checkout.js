import React from 'react';

function Checkout() {
    return React.createElement(
        'div', { style: { padding: '2rem' } },
        React.createElement('h2', null, 'Checkout'),
        React.createElement('p', null, 'Integrate Stripe Elements here to complete your purchase.')
    );
}

export default Checkout;