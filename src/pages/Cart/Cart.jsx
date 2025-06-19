import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { Link } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => dispatch(removeFromCart(id));

  const changeQty = (id, diff) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const nextQty = item.quantity + diff;
    if (nextQty < 1) return;
    dispatch(updateQuantity({ id, quantity: nextQty }));
  };

  if (cartItems.length === 0) {
    return <div style={{ padding: '2rem' }}>Your cart is empty.</div>;
  }

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>
        Your Cart ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})
      </h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <li key={item.id} style={{ marginBottom: '1rem' }}>
            <span style={{ fontWeight: 600 }}>{item.product.name}</span>{' '}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <button
                className="qty-btn"
                aria-label={`Decrease quantity for ${item.product.name}`}
                onClick={() => changeQty(item.id, -1)}
                disabled={item.quantity === 1}
              >
                –
              </button>
              <span aria-label={`Quantity of ${item.product.name}`}>{item.quantity}</span>
              <button
                className="qty-btn"
                aria-label={`Increase quantity for ${item.product.name}`}
                onClick={() => changeQty(item.id, 1)}
              >
                +
              </button>
            </div>{' '}
            — ${ (item.product.price * item.quantity).toFixed(2) }
            <button
              onClick={() => handleRemove(item.id)}
              style={{ marginLeft: '0.5rem' }}
              aria-label={`Remove ${item.product.name} from cart`}
              className="cart-btn"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: ${total.toFixed(2)}</h3>

      <Link to="/checkout" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Proceed to Checkout
      </Link>
    </div>
  );
}

export default Cart; 