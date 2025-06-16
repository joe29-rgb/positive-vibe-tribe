import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';

function Cart() {
    var cartItems = useSelector(function(state) {
        return state.cart.items;
    });
    var dispatch = useDispatch();

    function handleRemove(id) {
        dispatch(removeFromCart(id));
    }

    if (cartItems.length === 0) {
        return React.createElement('div', { style: { padding: '2rem' } }, 'Your cart is empty.');
    }

    var total = cartItems.reduce(function(acc, item) {
        return acc + item.price * item.quantity;
    }, 0);

    return React.createElement(
        'div', { style: { padding: '2rem' } },
        React.createElement(
            'h2',
            null,
            'Your Cart (' + cartItems.length + ' item' + (cartItems.length > 1 ? 's' : '') + ')'
        ),
        React.createElement(
            'ul', { style: { listStyle: 'none', padding: 0 } },
            cartItems.map(function(item) {
                return React.createElement(
                    'li', { key: item._id, style: { marginBottom: '1rem' } },
                    React.createElement(
                        'span',
                        null,
                        item.name + ' x' + item.quantity + ' - $' + item.price * item.quantity
                    ),
                    ' ',
                    React.createElement(
                        'button', {
                            onClick: function() {
                                return handleRemove(item._id);
                            },
                            style: { marginLeft: '0.5rem' },
                        },
                        'Remove'
                    )
                );
            })
        ),
        React.createElement('h3', null, 'Total: $' + total),
        React.createElement(
            'a', { href: '/checkout', style: { display: 'inline-block', marginTop: '1rem' } },
            'Proceed to Checkout'
        )
    );
}

export default Cart;