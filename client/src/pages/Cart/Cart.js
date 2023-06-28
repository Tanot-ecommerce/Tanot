import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../../component/context/ContextProvider";
import { CircularProgress } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import "../../utils/generalstyles/generalstyles.css";

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getCartData = async () => {
            if (!account) {
                navigate("/Auth");
            } else {
                try {
                    const res = await fetch("/cart", {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });

                    if (!res.ok) {
                        throw new Error("Error fetching cart data");
                    }

                    const data = await res.json();
                    setCartData(data.carts);
                    calculateSubtotal(data.carts);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    // Handle error state
                }
            }
        };

        getCartData();
    }, [account, navigate]);

    const calculateSubtotal = (cartItems) => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + item.mrp * item.quantity;
        }, 0);
        setSubtotal(totalPrice);
    };

    const handleQuantityChange = (index, value) => {
        const updatedCartData = [...cartData];
        const updatedQuantity = Math.max(
            1,
            updatedCartData[index].quantity + value
        );
        updatedCartData[index].quantity = updatedQuantity;
        setCartData(updatedCartData);
        calculateSubtotal(updatedCartData);
    };

    const handleDelete = (index) => {
        const updatedCartData = cartData.filter((item, i) => i !== index);
        setCartData(updatedCartData);
        calculateSubtotal(updatedCartData);
    };

    const placeOrder = async () => {
        const orderAmount = 10000;

        setLoading(true);

        try {
            const res = await fetch("/place/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderAmount,
                    cartData,
                }),
            });

            if (!res.ok) {
                throw new Error("Error placing order");
            }

            setCartData([]);
            calculateSubtotal([]);
            toast.success("Order Placed successfully", {
                position: "top-center",
            });
        } catch (error) {
            console.log(error);
            toast.warning("Server Error in saving data", {
                position: "top-center",
            });
        }

        setLoading(false);
    };

    return (
        <section className="cart-section pt-6 pl-6 pr-2 ">
            <div className="cart-container flex justify-between p-6">
                <div className="cart-left w-[40%] flex flex-col px-10 justify-center">
                    {cartData.length === 0 ? (
                        <h1>No Item in Cart</h1>
                    ) : loading ? (
                        <div className="flex flex-col items-center mt-16">
                            <CircularProgress />
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                        cartData.map((item, index) => (
                            <div
                                key={item._id}
                                className="cart-item flex  w-full my-4 p-4 border border-gray-300 rounded-md"
                            >
                                <div className="cart-product-image w-[50%]">
                                    <img
                                        src={item.images[0]}
                                        alt={item.title}
                                        className="w-[17rem] rounded h-[14rem]"
                                    />
                                </div>
                                <div className="cart-product-detail w-[50%] ml-4 flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold mb-1">
                                            {item.title}
                                        </h2>
                                        <FaHeart className="text-black cursor-pointer" />
                                    </div>
                                    <p className="text-lg mb-2 text-left">
                                        Price: ₹
                                        {item.mrp
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                        .00
                                    </p>
                                    <p className="stock-filter text-left text-xs">
                                        In Stock
                                    </p>
                                    <h2 className="text-sm my-2">Quantity</h2>
                                    <div className="quantity-button mb-4 rounded-md flex items-center justify-center px-1 py-1 w-[142px]">
                                        <button
                                            className="p-1"
                                            onClick={() =>
                                                handleQuantityChange(index, -1)
                                            }
                                        >
                                            -
                                        </button>
                                        <input
                                            type="text"
                                            value={item.quantity}
                                            readOnly
                                            className="bg-transparent px-2 w-10 text-center"
                                        />
                                        <button
                                            className="p-1"
                                            onClick={() =>
                                                handleQuantityChange(index, 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <button
                                            className="block w-full px-4 py-2 delete-button text-white bg-black rounded-md"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <ToastContainer />
                </div>
                <div className="cart-right m-4 w-[40%] h-[80%] text-black px-14">
                    <h2 className="text-2xl text-center py-6 font-bold">
                        Your Shopping Cart
                    </h2>
                    <div className="billing-details">
                        {/* Remaining code for billing details */}
                        <div className="w-[26.25rem] h-0.5 mx-auto bg-gray-300 order-line"></div>
                        <div className="flex justify-between mt-4 mb-3 text-black font-bold">
                            <p>Products</p>
                            <p>Sub Total</p>
                        </div>
                        <div className="w-[26.25rem] h-0.5 mx-auto bg-gray-300 order-line"></div>
                        <div className="cart-summary-item flex justify-between mt-4 mb-3">
                            <p>Total ({cartData.length} items):</p>
                            <p>₹{subtotal}</p>
                        </div>
                        <div className="w-[26.25rem] h-px mx-auto bg-gray-300 order-line "></div>
                        <div className="cart-summary-item flex justify-between mt-4 mb-3">
                            <p>Delivery Fee:</p>
                            <p>₹10.00</p>
                        </div>
                        <div className="w-[26.25rem] h-0.5 mx-auto bg-gray-300 order-line"></div>
                        <div className="cart-summary-item flex justify-between my-8">
                            <p className="font-semibold text-black">
                                Total Price:
                            </p>
                            <p className="font-semibold text-black">
                                ₹{subtotal + 10.0}
                            </p>
                        </div>
                        <div className="w-[26.25rem] h-px mx-auto bg-gray-300 order-line "></div>

                        {cartData.length !== 0 && (
                            <button
                                onClick={placeOrder}
                                className="order-button my-4 px-4 py-2 bg-black text-white font-semibold rounded-md"
                            >
                                Place Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
