import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../../component/context/ContextProvider";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../utils/generalstyles/generalstyles.css";

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);

    // to set the current price of orders so that if in future
    // the price of a product changes, it will show the current price
    const [price, setPrice] = useState([]);

    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getCartData = async () => {
            if (!account) {
                navigate("/Auth");
            } else {
                const res = await fetch("/cart", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                const data = await res.json();
                // console.log(data.carts);
                if (res.status !== 201) {
                    console.log("error");
                } else {
                    setCartData(data.carts);
                    const keys = data.carts.map((cart) => cart.price); // Replace 'name' with the desired key(s)
                    setPrice(keys);
                    // console.log(price);

                    setLoading(false);
                }
            }
        };

        getCartData();
    }, []);

    const placeOrder = async () => {
        const orderAmount = 10000;

        setLoading(true);
        const res = await fetch("/place/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderAmount,
                cartData,
                price,
            }),
        });
        const data = await res.json();

        if (res.status === 422 || !data) {
            toast.warning("Server Error in saving data", {
                position: "top-center",
            });
        } else {
            setCartData([]);
            toast.success("Order Placed successfully", {
                position: "top-center",
            });
        }
        setLoading(false);
    };

    return (
        <section className="cart-section pt-6 pl-6 pr-2 ">
            <div className="cart-container flex justify-between">
                <div className="cart-left w-1/2 flex flex-col justify-center">
                    {price.length === 0 ? (
                        <h1>No Item in Cart</h1>
                    ) : loading ? (
                        <div className="flex flex-col items-center mt-16">
                            <CircularProgress />
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                        cartData.map((item) => (
                            <div
                                key={item._id}
                                className="cart-item flex justify-between  w-full my-4 p-4 border border-gray-300 rounded-md"
                            >
                                <div className="cart-product-image">
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="w-36 h-32 mb-4"
                                    />
                                </div>
                                <div className="cart-product-detail flex flex-col">
                                    <h2 className="text-lg font-semibold mb-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm mb-4">
                                        Price: $
                                        {item.mrp
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                    </p>
                                    <div className="flex justify-between mb-4">
                                        <button className="block w-full px-4 py-2 shop-button text-white rounded-md">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <ToastContainer />
                </div>
                <div className="cart-right m-4 w-1/2 h-96 bg-black text-white p-4">
                    <h2 className="text-2xl">Your Shopping Cart</h2>
                    {cartData.length !== 0 && (
                        <button
                            onClick={placeOrder}
                            className="my-4 px-4 py-2 bg-white text-black font-semibold rounded-md"
                        >
                            Place Order
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Cart;
