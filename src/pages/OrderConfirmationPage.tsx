import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderConfirmationPage.css';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order] = useState({
    id: orderId,
    status: 'pending',
    date: new Date().toLocaleDateString()
  });

  useEffect(() => {
    document.title = 'Shop - Order Confirmation';
  }, []);

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-message">
        <div className="success-icon">✓</div>
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been received and is being processed.</p>

        <div className="order-details">
          <div className="detail-item">
            <span className="label">Order Number</span>
            <span className="value">{order.id}</span>
          </div>
          <div className="detail-item">
            <span className="label">Order Date</span>
            <span className="value">{order.date}</span>
          </div>
          <div className="detail-item">
            <span className="label">Status</span>
            <span className="value status">{order.status}</span>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
          <Link to="/products" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>

        <p className="confirmation-note">📧 A confirmation email has been sent to your email address.</p>
      </div>
    </div>
  );
};
