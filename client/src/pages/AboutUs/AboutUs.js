import React from "react";
import founderImg from "../../Images/founders.jpg";

const AboutUs = () => {
    return (
        <div className="about-container flex">
            <div className="about-left w-1/2 p-4">
                <h1 className="text-4xl font-bold mb-4">
                    About Our Brand "Tanot"
                </h1>
                <p className="text-lg">
                    Some information about our brand Tanot...
                </p>
            </div>
            <div className="about-right w-1/2">
                <img
                    src={founderImg}
                    alt="Founders of Tanot"
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default AboutUs;
