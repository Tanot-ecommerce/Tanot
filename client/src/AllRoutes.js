import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Type1 from './pages/collections/Type1';
import Auth from './pages/Auth/Auth';
import Cart from './pages/Cart/Cart';
import ProductDetail from './pages/ProductDetail/ProductDetail';

const AllRoutes = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collections/:id" element={<Type1 />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path='/Cart' element={<Cart />} />
      <Route path="/productdetail/:id" element={<ProductDetail />} />
    </Routes>
    </>
  )
}

export default AllRoutes
