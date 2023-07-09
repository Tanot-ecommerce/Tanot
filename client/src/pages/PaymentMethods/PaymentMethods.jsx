import React from "react";
import { FaCreditCard, FaPaypal, FaBitcoin } from "react-icons/fa";

const PaymentMethods = () => {
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                    Payment Methods
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg p-6 hover:shadow-white hover:scale-105 transition-all duration-300">
                        <FaCreditCard className="text-4xl text-gray-800 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Credit Card
                        </h3>
                        <p className="text-gray-600">
                            We accept all major credit cards, including Visa,
                            Mastercard, and American Express. Your payment
                            information is securely processed using
                            industry-standard encryption.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg p-6 hover:shadow-white hover:scale-105 transition-all duration-300">
                        <FaPaypal className="text-4xl text-gray-800 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            PayPal
                        </h3>
                        <p className="text-gray-600">
                            You can also choose to pay with PayPal for a quick
                            and secure checkout experience. Simply select the
                            PayPal option during checkout and follow the
                            instructions.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg p-6 hover:shadow-white hover:scale-105 transition-all duration-300">
                        <FaBitcoin className="text-4xl text-gray-800 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Bitcoin
                        </h3>
                        <p className="text-gray-600">
                            For cryptocurrency enthusiasts, we accept Bitcoin as
                            a payment method. You can select the Bitcoin option
                            during checkout and follow the instructions for
                            payment.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentMethods;
