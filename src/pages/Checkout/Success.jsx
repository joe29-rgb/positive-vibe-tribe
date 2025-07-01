import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Success() {
  useEffect(() => {
    toast.success('Payment successful! Thank you for your order.');
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Thank you for your purchase! 🎉</h2>
      <p>We've emailed you a receipt and will notify you when your items are on the way.</p>
      <Link to="/products" className="btn btn-gradient" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
        Continue Shopping
      </Link>
    </div>
  );
}

export default Success; 