import React, { useState, useEffect } from "react";
import logo from "../../Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faInstagram,
    faPinterest,
    faLinkedinIn,
    faYoutube,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer py-6">
            <div className="container gap-10 flex mx-auto p-6 space-x-8">
                <div className="footer-left flex flex-col sm:flex-col justify-center sm:justify-start mb-6 sm:mb-0">
                    {/* Logo image */}
                    <img
                        src={logo}
                        alt="Logo"
                        className="footer__logo-image w-24 h-auto"
                    />
                    <div className="footer-subscribe mt-6">
                        <h3 className="text-white text-3xl mb-2">Subscribe</h3>
                        <p className="text-gray-400 text-sm text-left">
                            Subscribe to our newsletter for the latest updates
                            and promotions.
                        </p>
                        <form className="mt-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-gray-800 rounded-md py-2 px-4 border border-white text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="submit"
                                className="subscribe-button mt-2 bg-white border border-white text-black rounded-md py-2 px-4 w-full "
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="footer-right flex flex-col sm:flex-row justify-between w-full">
                    <div className="footer-section-container">
                        <div className="footer-section-list mb-6 sm:mb-0">
                            <h3 className="text-white text-3xl font-bold mb-2">
                                Information
                            </h3>
                            <ul className="text-gray-400 text-sm">
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
                    </div>
                    <div className="footer-section-container">
                        <div className="footer-section-list mb-6 sm:mb-0">
                            <h3 className="text-white text-3xl font-bold mb-2">
                                Policy
                            </h3>
                            <ul className="text-gray-400 text-sm">
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
                    </div>
                    <div className="footer-section-container">
                        <div className="footer-section-list">
                            <h3 className="text-white text-3xl font-bold mb-2">
                                Contact
                            </h3>
                            <ul className="text-gray-400 text-sm">
                                <li>Email: info@example.com</li>
                                <li>Phone: +1 123 456 7890</li>
                                <li>Address: 123 Street, City, Country</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-700 my-8" />
            <div className="footer-bottom-container px-10 mx-auto pb-8">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2023 Your Company. All rights reserved.
                    </p>
                    <div className="footer__social-media pr-6 mt-4 lg:mt-0 space-x-2">
                        {/* Social media icons */}
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
                    {showScroll && (
                        <div
                            className="footer__scroll-to-top cursor-pointer"
                            onClick={handleScrollToTop}
                        >
                            <FontAwesomeIcon icon={faArrowUp} />
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
