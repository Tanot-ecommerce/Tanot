import React, { useState } from "react";

const TermsOfService = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleTerms = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <h2 className="text-2xl font-bold mb-6">Terms of Service</h2>

            <div className="border border-gray-300 rounded-lg p-4 shadow-md">
                <button
                    className="w-full flex justify-between items-center bg-gray-200 text-left py-3 px-4 rounded-lg focus:outline-none"
                    onClick={toggleTerms}
                >
                    <span className="text-lg font-medium">
                        What are the terms and conditions?
                    </span>
                    <svg
                        className={`ml-2 h-5 w-5 ${
                            isOpen ? "transform rotate-180" : ""
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
                {isOpen && (
                    <div className="bg-gray-100 mt-4 p-4 rounded-lg">
                        <p className="text-gray-700">
                            By using our services, you agree to comply with the
                            following terms and conditions:
                        </p>
                        <ul className="list-disc list-inside mt-4 text-gray-700">
                            <li>
                                Respect the intellectual property rights of
                                Tanot brand.
                            </li>
                            <li>
                                Do not engage in any illegal or unauthorized
                                activities.
                            </li>
                            <li>
                                Provide accurate and up-to-date information
                                during the registration process.
                            </li>
                            <li>
                                Ensure the security and confidentiality of your
                                account credentials.
                            </li>
                            <li>
                                Use our services responsibly and in accordance
                                with applicable laws.
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TermsOfService;
