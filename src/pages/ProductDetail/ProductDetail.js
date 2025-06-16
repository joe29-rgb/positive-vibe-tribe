import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    var _useState = useState(null),
        product = _useState[0],
        setProduct = _useState[1];
    var params = useParams();

    useEffect(
        function() {
            fetch('/api/products/' + params.id)
                .then(function(res) {
                    return res.json();
                })
                .then(function(data) {
                    setProduct(data);
                })['catch'](function(err) {
                    console.error(err);
                });
        }, [params.id]
    );

    if (!product) {
        return React.createElement('div', null, 'Loading product...');
    }

    return React.createElement(
        'div', { style: { padding: '2rem' } },
        React.createElement('h2', null, product.name),
        React.createElement('img', {
            src: product.image,
            alt: product.name,
            style: { maxWidth: '100%', height: 'auto' },
        }),
        React.createElement('p', null, product.description),
        React.createElement('p', null, '$' + product.price)
    );
}

export default ProductDetail;