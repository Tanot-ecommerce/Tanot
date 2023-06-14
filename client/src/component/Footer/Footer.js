import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faLinkedinIn,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__section-title">Information</h3>
          <ul className="footer__section-list">
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3 className="footer__section-title">Policy</h3>
          <ul className="footer__section-list">
            <li>
              <a href="/shipping">Shipping Policy</a>
            </li>
            <li>
              <a href="/returns">Returns &amp; Refunds</a>
            </li>
            <li>
              <a href="/payment">Payment Methods</a>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h3 className="footer__section-title">Contact</h3>
          <ul className="footer__section-list">
            <li>Email: info@example.com</li>
            <li>Phone: +1 123 456 7890</li>
            <li>Address: 123 Street, City, Country</li>
          </ul>
        </div>
        <div className="footer__section">
          <h3 className="footer__section-title">Subscribe</h3>
          <p className="subscribe-description">
            Subscribe to our newsletter for the latest updates and promotions.
          </p>
          <form className="footer__subscribe-form">
            <input type="email" placeholder="Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <hr />
      <div className="footer__social-icons">
        <p className="footer__copy">
          © 2023 Your Company. All rights reserved.
        </p>
        <div className="footer__social-media">
          <a href="https://www.facebook.com">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.instagram.com">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.pinterest.com">
            <FontAwesomeIcon icon={faPinterest} />
          </a>
          <a href="https://www.linkedin.com">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="https://www.youtube.com">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://www.twitter.com">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
