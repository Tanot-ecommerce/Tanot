import React from "react";
import clsx from "clsx";
import "./PersonalInfo.css";

const PersonalInfo = () => {
    return (
        <section>
            <div className="user-info-container bg-gray-900 rounded-xl text-white pl-10 py-8 m-6 shadow-md">
                <div className="order-history-header mb-8">
                    <h2 className="text-2xl font-bold">Your Information</h2>
                </div>
                <div className="flex flex-wrap">
                    <div className="mb-4 w-1/2 pr-2">
                        <label className="block mb-2 label-small">Name</label>
                        <input
                            type="text"
                            className={clsx(
                                "input-field rounded bg-white text-black py-1"
                            )}
                        />
                    </div>
                    <div className="mb-4 w-1/2 pl-2">
                        <label className="block mb-2 label-small">Email</label>
                        <input
                            type="email"
                            className={clsx(
                                "input-field rounded bg-white text-black py-1"
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="mb-4 w-1/2 pr-2">
                        <label className="block mb-2 label-small">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className={clsx(
                                "input-field rounded bg-white text-black py-1"
                            )}
                        />
                    </div>
                    <div className="mb-4 w-1/2 pl-2 flex flex-col">
                        <label className="block mb-2 label-small">
                            Contact
                        </label>
                        <div className="relative flex">
                            <input
                                type="tel"
                                className={clsx(
                                    "input-field-country-code mr-3 w-16 rounded bg-white text-black py-1"
                                )}
                            />
                            <input
                                type="tel"
                                className={clsx(
                                    "input-field-mobile-number rounded bg-white text-black py-1"
                                )}
                            />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold my-4">Address</h2>
                <div className="flex flex-wrap">
                    <div className="mb-4 w-1/2 pr-2">
                        <label className="block mb-2 label-small">
                            House/Flat Number
                        </label>
                        <input
                            type="text"
                            className={clsx(
                                "input-field rounded bg-white text-black py-1"
                            )}
                        />
                    </div>
                    <div className="mb-4 w-1/2 pl-2">
                        <label className="block mb-2 label-small">
                            Apartment
                        </label>
                        <input
                            type="text"
                            className={clsx(
                                "input-field rounded bg-white text-black py-1"
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="mb-4 w-1/2 pr-2">
                        <label className="block mb-2 label-small">
                            Landmark
                        </label>
                        <input
                            type="text"
                            className={clsx(
                                "input-field rounded bg-white text-black py-1"
                            )}
                        />
                    </div>
                    <div className="mb-4 w-1/2 pl-2">
                        <label className="block mb-2 label-small">
                            Pincode
                        </label>
                        <input
                            type="text"
                            className={clsx(
                                "input-field rounded bg-white text-black py-1"
                            )}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalInfo;
