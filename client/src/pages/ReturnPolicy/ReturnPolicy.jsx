import React from "react";

const ReturnPolicy = () => {
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                    Returns & Refunds
                </h2>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="bg-white shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Easy Returns
                            </h3>
                            <p className="text-gray-600">
                                We offer hassle-free returns within 30 days of
                                purchase. If you are not satisfied with your
                                order, simply contact our customer support team
                                and we'll guide you through the process.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="bg-white shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Refunds
                            </h3>
                            <p className="text-gray-600">
                                Once your return is received and inspected, we
                                will initiate a refund to your original payment
                                method. Please allow 5-7 business days for the
                                refund to reflect in your account.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                        <div className="bg-white shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Exchanges
                            </h3>
                            <p className="text-gray-600">
                                If you received a defective or damaged product,
                                we are happy to exchange it for a new one.
                                Contact our support team and we'll assist you
                                with the exchange process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReturnPolicy;
