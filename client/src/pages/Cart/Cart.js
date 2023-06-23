import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../../component/context/ContextProvider";
import { CircularProgress } from "@mui/material";
import "./Cart.css";
import "../../utils/generalstyles/generalstyles.css";

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);

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

                if (res.status !== 201) {
                    console.log("error");
                } else {
                    setCartData(data.carts);
                    setLoading(false);
                }
            }
        };

        getCartData();
    }, []);

    return (
        <div className="flex flex-wrap p-6 justify-center">
            {loading ? (
                <div className="flex flex-col items-center mt-16">
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div>
            ) : (
                cartData.map((item) => (
                    <div
                        key={item._id}
                        className="cart-item w-1/4 mx-4 my-4 p-4 border border-gray-300 rounded-md max-w-250"
                    >
                        <img
                            src={item.url[0]}
                            alt={item.title}
                            className=" w-72 h-64 mb-4"
                        />
                        <h2 className="text-lg font-semibold mb-2">
                            {item.title}
                        </h2>
                        <p className="text-sm mb-4">Price: ${item.mrp}</p>
                        <div className="flex justify-between mb-4">
                            <button className="block w-full px-4 py-2 shop-button text-white rounded-md">
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
