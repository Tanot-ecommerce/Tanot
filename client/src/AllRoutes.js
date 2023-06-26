import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Type1 from "./pages/collections/Type1";
import Auth from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Profile from "./pages/Profile/Profile";
import AboutUs from "./pages/AboutUs/AboutUs";
import Order from "./pages/OrderHistory/Order";
import Products from "./pages/Products/Products";

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections/:id" element={<Type1 />} />
                <Route path="/Auth" element={<Auth />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/productdetail/:id" element={<ProductDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </>
    );
};

export default AllRoutes;
