import React from 'react';
import { Link } from 'react-router-dom';

function Cancel() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Payment cancelled</h2>
      <p>You can review your cart and try again whenever you're ready.</p>
      <Link to="/cart" className="btn btn-gradient" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
        Return to Cart
      </Link>
    </div>
  );
}

export default Cancel; 