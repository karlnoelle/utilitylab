import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <p>Modern e-commerce PWA with Stripe integration</p>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>support@shop.example</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};
