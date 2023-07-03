import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Type1 from "./pages/collections/Type1";
import Auth from "./pages/Auth/Auth";
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Profile from "./pages/Profile/Profile";
import AboutUs from "./pages/AboutUs/AboutUs";
import FAQs from "./pages/FAQs/FAQs";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy";
import ReturnPolicy from "./pages/ReturnPolicy/ReturnPolicy";
import PaymentMethods from "./pages/PaymentMethods/PaymentMethods";
import Order from "./pages/OrderHistory/Order";
import Products from "./pages/Products/Products";
import Checkout from "./pages/checkout/Checkout";

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
                <Route path="/faq" element={<FAQs />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/returns" element={<ReturnPolicy />} />
                <Route path="/payment" element={<PaymentMethods />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/products" element={<Products />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </>
    );
};

export default AllRoutes;
