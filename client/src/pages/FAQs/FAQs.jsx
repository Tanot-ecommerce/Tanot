import React, { useState } from "react";

const FAQs = () => {
    const [faq1Open, setFaq1Open] = useState(false);
    const [faq2Open, setFaq2Open] = useState(false);
    const [faq3Open, setFaq3Open] = useState(false);
    const [faq4Open, setFaq4Open] = useState(false);
    const [faq5Open, setFaq5Open] = useState(false);

    const toggleFaq1 = () => {
        setFaq1Open(!faq1Open);
    };

    const toggleFaq2 = () => {
        setFaq2Open(!faq2Open);
    };

    const toggleFaq3 = () => {
        setFaq3Open(!faq3Open);
    };

    const toggleFaq4 = () => {
        setFaq4Open(!faq4Open);
    };

    const toggleFaq5 = () => {
        setFaq5Open(!faq5Open);
    };

    return (
        <div className="max-w-md mx-auto py-14">
            <h2 className="text-2xl font-bold mb-6">FAQs</h2>

            <div className="space-y-4">
                <div>
                    <button
                        className="w-full flex justify-between items-center bg-gray-200 text-left py-3 px-4 rounded-lg"
                        onClick={toggleFaq1}
                    >
                        <span className="text-lg font-medium">
                            What is Tanot brand?
                        </span>
                        <svg
                            className={`ml-2 h-5 w-5 ${
                                faq1Open ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {faq1Open && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p>
                                Tanot brand is a female clothing branch that
                                offers a wide range of fashionable and trendy
                                clothes for women. We specialize in providing
                                high-quality clothing items that are designed to
                                make women look and feel confident.
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="w-full flex justify-between items-center bg-gray-200 text-left py-3 px-4 rounded-lg"
                        onClick={toggleFaq2}
                    >
                        <span className="text-lg font-medium">
                            How can I place an order?
                        </span>
                        <svg
                            className={`ml-2 h-5 w-5 ${
                                faq2Open ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {faq2Open && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p>
                                To place an order, simply browse our collection,
                                select the items you like, choose the size and
                                color, and add them to your cart. Once you have
                                finished shopping, proceed to the checkout page
                                and follow the instructions to complete your
                                order.
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="w-full flex justify-between items-center bg-gray-200 text-left py-3 px-4 rounded-lg"
                        onClick={toggleFaq3}
                    >
                        <span className="text-lg font-medium">
                            What are the shipping options?
                        </span>
                        <svg
                            className={`ml-2 h-5 w-5 ${
                                faq3Open ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {faq3Open && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p>
                                We offer various shipping options based on your
                                location. During the checkout process, you will
                                be able to select your preferred shipping
                                method, and the shipping cost will be calculated
                                accordingly. We strive to provide reliable and
                                timely delivery for all orders.
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="w-full flex justify-between items-center bg-gray-200 text-left py-3 px-4 rounded-lg"
                        onClick={toggleFaq4}
                    >
                        <span className="text-lg font-medium">
                            Can I return or exchange an item?
                        </span>
                        <svg
                            className={`ml-2 h-5 w-5 ${
                                faq4Open ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {faq4Open && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p>
                                We have a hassle-free return and exchange
                                policy. If you are not satisfied with your
                                purchase, you can return or exchange the item
                                within 30 days of receiving it. Please ensure
                                that the item is unused and in its original
                                packaging for a smooth return or exchange
                                process.
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <button
                        className="w-full flex justify-between items-center bg-gray-200 text-left py-3 px-4 rounded-lg"
                        onClick={toggleFaq5}
                    >
                        <span className="text-lg font-medium">
                            How can I contact customer support?
                        </span>
                        <svg
                            className={`ml-2 h-5 w-5 ${
                                faq5Open ? "transform rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {faq5Open && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p>
                                If you have any questions or need assistance,
                                our customer support team is available to help.
                                You can reach out to us through our contact page
                                or email us at support@tanotbrand.com. We strive
                                to provide prompt and helpful responses to all
                                customer inquiries.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
