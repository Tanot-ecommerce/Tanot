import React, { useState } from "react";
import clsx from "clsx";
import profilePic from "../../Images/profile.jpg";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import OrderHistory from "../OrderHistory/OrderHistory";
import Wishlist from "../WishList/WishList";
import "./Profile.css";
import "../../utils/generalstyles/generalstyles.css";
import axios from 'axios';

const Profile = () => {
    const [activeSection, setActiveSection] = useState("profile");
    
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

 
    return (
        <div className="profile flex flex-col text-black min-h-screen p-8">
            <div className="profile-container newpage-container flex flex-row flex-grow">
                <div className="profile-left-section w-1/4 pr-2">
                    <div className="profile-section mt-8 flex flex-col text-black justify-center items-center py-12">
                        <div className="profile-info text-center  overflow-hidden">
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="object-cover w-28 h-28 rounded-full mb-3"
                            />
                            <h3 className="text-2xl font-bold my-2">
                                Anuj Sharma
                            </h3>
                            <p className="text-sm label-arial">
                                anujsharma@gmail.com
                            </p>
                        </div>
                        <div className="profile-links mt-14 flex flex-row space-x-4 mb-4">
                            <ul className="text-center text-black label-arial">
                                <li
                                    className={clsx(
                                        "py-1 label-arial cursor-pointer",
                                        {
                                            "font-bold":
                                                activeSection === "userprofile",
                                        }
                                    )}
                                    onClick={() =>
                                        handleSectionChange("userprofile")
                                    }
                                >
                                    Profile Information
                                </li>
                                <li
                                    className={clsx(
                                        "py-3 label-arial cursor-pointer",
                                        {
                                            "font-bold":
                                                activeSection ===
                                                "orderHistory",
                                        }
                                    )}
                                    onClick={() =>
                                        handleSectionChange("orderHistory")
                                    }
                                >
                                    Order History
                                </li>
                                <li
                                    className={clsx(
                                        "py-3 label-arial cursor-pointer",
                                        {
                                            "font-bold":
                                                activeSection === "wishlist",
                                        }
                                    )}
                                    onClick={() =>
                                        handleSectionChange("wishlist")
                                    }
                                >
                                    Wishlist
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="vertical-line w-px bg-black my-auto"></div>

                <div className="profile-right-section w-3/4 pl-2">
                    <div className="p-8">
                        {activeSection === "userprofile" && <PersonalInfo />}
                        {activeSection === "orderHistory" && <OrderHistory />}
                        {activeSection === "wishlist" && <Wishlist />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
