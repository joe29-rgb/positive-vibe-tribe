import React from 'react';

function Footer() {
    return React.createElement(
        'footer', { style: { textAlign: 'center', padding: '1.5rem 0' } },
        React.createElement(
            'p',
            null,
            'Copyright ' + new Date().getFullYear() + ' Positive Vibe Tribe'
        ),
        React.createElement('p', null, 'Contact: info@positivevibetribe.com')
    );
}

export default Footer;