import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import { validateEmail, validateCardName } from '../utils/validation';
import './CheckoutPage.css';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { session, loading, error, total, itemCount, initializeCheckout, setError } = useCheckout();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US'
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = 'Shop - Checkout';
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!validateCardName(formData.name)) {
      errors.name = 'Name must be at least 3 characters';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (itemCount === 0) {
      setError('Your cart is empty');
      navigate('/cart');
      return;
    }

    const checkoutSession = await initializeCheckout({
      email: formData.email,
      name: formData.name
    });

    if (checkoutSession) {
      navigate('/payment', { state: { session: checkoutSession, checkoutData: formData } });
    }
  };

  if (itemCount === 0) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <div className="empty-cart-message">
          <p>Your cart is empty. Please add items before checking out.</p>
          <button onClick={() => navigate('/products')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h2>Shipping Information</h2>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={validationErrors.email ? 'error' : ''}
                required
              />
              {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={validationErrors.name ? 'error' : ''}
                required
              />
              {validationErrors.name && <span className="error-message">{validationErrors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={validationErrors.address ? 'error' : ''}
                required
              />
              {validationErrors.address && <span className="error-message">{validationErrors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={validationErrors.city ? 'error' : ''}
                  required
                />
                {validationErrors.city && <span className="error-message">{validationErrors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Postal Code *</label>
                <input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={validationErrors.postalCode ? 'error' : ''}
                  required
                />
                {validationErrors.postalCode && (
                  <span className="error-message">{validationErrors.postalCode}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </section>

          {error && <div className="error-alert">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Continue to Payment'}
          </button>
        </form>

        <aside className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            <p className="item-count">{itemCount} items in cart</p>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="security-note">🔒 Your payment information is secure</p>
        </aside>
      </div>
    </div>
  );
};
