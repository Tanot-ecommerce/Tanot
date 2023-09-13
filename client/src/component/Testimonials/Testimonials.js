import React, { useState, useEffect } from "react";
import testimonialData from "../../data/TestimonialsData";
import { LeftSliderArrow, RightSliderArrow } from "../../utils/assets/svg";
import "../../utils/generalstyles/generalstyles.css";
import "./Testimonials.css";

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleTestimonials, setVisibleTestimonials] = useState([]);

    useEffect(() => {
        updateVisibleTestimonials();
    }, [currentSlide]);

    const updateVisibleTestimonials = () => {
        const startIndex = currentSlide % testimonialData.length;
        const endIndex = (startIndex + 1) % testimonialData.length;
        setVisibleTestimonials([
            testimonialData[startIndex],
            testimonialData[endIndex],
        ]);
    };

    const handlePreviousSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? testimonialData.length - 2 : prevSlide - 1
        );
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === testimonialData.length - 2 ? 0 : prevSlide + 1
        );
    };

    return (
        <section className="testimonials">
            <h2 className="testimonial-section-title label-arial text-white text-4xl">
                Customer <span>Testimonials</span>
            </h2>
            <div className="slider-container">
                <div
                    className="testimonial-slider-arrow slider-arrow-left"
                    onClick={handlePreviousSlide}
                >
                    <LeftSliderArrow />
                </div>
                <div className="testimonials-list">
                    {visibleTestimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-item">
                            <div className="testimonial-rating">
                                {testimonial.rating}
                            </div>
                            <p className="testimonial-text label-arial">
                                {testimonial.description}
                            </p>
                            <div className="testimonial-details">
                                <div className="testimonial-author">
                                    <span className="author-name">
                                        {testimonial.name}
                                    </span>
                                </div>
                                <hr className="testimonial-divider" />
                                <div className="testimonial-product">
                                    <img
                                        src={testimonial.productImage}
                                        alt={testimonial.productName}
                                        className="testimonial-image"
                                    />
                                    <span className="testimonial-product-name label-arial">
                                        {testimonial.productName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="testimonial-slider-arrow slider-arrow-right"
                    onClick={handleNextSlide}
                >
                    <RightSliderArrow />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
