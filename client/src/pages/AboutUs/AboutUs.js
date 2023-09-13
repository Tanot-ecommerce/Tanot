import React, { useState } from "react";
import "./AboutUs.css";
import "../../utils/generalstyles/generalstyles.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.jpg";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";

const AboutUs = () => {
    const images = [image1, image2, image3, image4];
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="about-container p-12 flex justify-between">
            <div className="about-left w-2/5 p-10">
                <h1 className="text-4xl label-arial mb-4">About Tanot</h1>
                <p className="text-lg">
                    Some information about our female clothing brand, Tanot...
                </p>
                <p className="text-lg">
                    Tanot is a stylish and empowering women's clothing brand,
                    dedicated to creating fashion-forward designs that inspire
                    confidence and celebrate individuality.
                </p>
                <p className="text-lg">
                    Our brand embraces diversity and believes in providing a
                    range of sizes, catering to the unique shapes and body types
                    of all women. We strive to make every woman feel beautiful
                    and comfortable in our clothing.
                </p>
                <p className="text-lg">
                    At Tanot, we prioritize sustainability and ethical
                    practices. We carefully select materials that are
                    eco-friendly and prioritize fair trade and responsible
                    manufacturing processes.
                </p>
            </div>
            <div className="about-right w-1/2 relative">
                <div className="image-container flex items-center">
                    <div
                        className="about-arrow about-left-arrow"
                        onClick={goToPrevious}
                    >
                        <FaChevronLeft />
                    </div>
                    <img
                        src={images[currentIndex]}
                        alt={`about-imag${currentIndex + 1}`}
                        className="about-image rounded-2xl"
                    />
                    <div
                        className="about-arrow about-right-arrow"
                        onClick={goToNext}
                    >
                        <FaChevronRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
