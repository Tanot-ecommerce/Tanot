import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import Promises from "../../component/promises/Promises";
import Banner from "../../component/Banner/Banner";
import ShopByCategory from "../../component/ShopByCategory/ShopByCategory";
import NewArrivals from "../../component/NewArrivals/NewArrivals";
import WhyTanot from "../../component/WhyTanot/WhyTanot";
import BestSellers from "../../component/BestSellers/BestSellers";
import Testimonials from "../../component/Testimonials/Testimonials";

const Home = () => {
    return (
        <>
            <Banner />
            <Promises />
            <ShopByCategory />
            <NewArrivals />
            <WhyTanot />
            <BestSellers />
            <Testimonials />
        </>
    );
};

export default Home;
