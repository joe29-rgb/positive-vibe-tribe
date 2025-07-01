import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ExpressCheckoutBadges from '../../components/ExpressCheckoutBadges/ExpressCheckoutBadges';
import TrustCredentials from '../../components/TrustCredentials/TrustCredentials';

function Checkout() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postal: ''
  });

  const [errors, setErrors] = useState({});

  const cartItems = useSelector((state) => state.cart.items);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[A-Za-z]{2,}$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.postal.trim()) newErrors.postal = 'Postal code is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      toast.error('Please correct the highlighted fields');
    } else {
      setErrors({});
      // Create Stripe Checkout Session via backend
      fetch('/api/payments/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((ci) => ({
            name: ci.product.name,
            price: ci.product.salePrice || ci.product.price,
            quantity: ci.quantity,
          })),
          successUrl: window.location.origin + '/checkout/success',
          cancelUrl: window.location.origin + '/checkout/cancel',
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.url) {
            window.location.href = data.url;
          } else {
            throw new Error(data.message || 'Stripe session failed');
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        });
    }
  };

  const inputStyle = { width: '100%', padding: '0.5rem', marginTop: '0.25rem' };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Checkout</h2>
      <ExpressCheckoutBadges />
      <TrustCredentials />
      <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 500 }}>
        {/* Name */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            style={inputStyle}
          />
          {errors.name && (
            <p id="name-error" style={{ color: 'var(--primary-red)' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            style={inputStyle}
          />
          {errors.email && (
            <p id="email-error" style={{ color: 'var(--primary-red)' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Address */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? 'address-error' : undefined}
            style={inputStyle}
          />
          {errors.address && (
            <p id="address-error" style={{ color: 'var(--primary-red)' }}>
              {errors.address}
            </p>
          )}
        </div>

        {/* City */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'city-error' : undefined}
            style={inputStyle}
          />
          {errors.city && (
            <p id="city-error" style={{ color: 'var(--primary-red)' }}>
              {errors.city}
            </p>
          )}
        </div>

        {/* Postal */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="postal">Postal Code</label>
          <input
            id="postal"
            name="postal"
            type="text"
            value={form.postal}
            onChange={handleChange}
            aria-invalid={!!errors.postal}
            aria-describedby={errors.postal ? 'postal-error' : undefined}
            style={inputStyle}
          />
          {errors.postal && (
            <p id="postal-error" style={{ color: 'var(--primary-red)' }}>
              {errors.postal}
            </p>
          )}
        </div>

        <button type="submit" className="cart-btn">
          Continue to Payment
        </button>
      </form>
    </div>
  );
}

export default Checkout; 