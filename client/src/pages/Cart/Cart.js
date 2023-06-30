import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../../component/context/ContextProvider";
import { CircularProgress } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import "../../utils/generalstyles/generalstyles.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState([]);

    // to set the current price of orders so that if in future
    // the price of a product changes, it will show the current price
    const [price, setPrice] = useState([]);
    const [size, setSize] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderAmount, setorderAmount] = useState(0);
    const { account, setAccount } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getCartData = async () => {
            try {
                setLoading(true);
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
                    // setLoading(true);
                    // console.log(data);
                    setCartData(data.carts);
                    const prices = data.carts.map((cart) => cart.product.price); // Replace 'name' with the desired key(s)
                    setPrice(prices);

                    const sizes = data.carts.map((cart) => cart.size);   //make array of sizes
                    setSize(sizes);

                    const productss = data.carts.map((cart) => cart.product._id);  //make array of products
                    setProducts([]);
                    setProducts((prevProducts) => prevProducts.concat(productss));

                    const qty = data.carts.map((cart) => cart.quantity);
                    setQuantity([]);
                    setQuantity((prevQuantity) => prevQuantity.concat(qty));

                    if (!res.ok) {
                        throw new Error("Error fetching cart data");
                    }

                    calculateorderAmount(data.carts);

                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                // Handle error state
            }
        };

        getCartData();
    }, [account, navigate]);

    const calculateorderAmount = (cartItems) => {
        const totalPrice = cartItems.reduce((total, item) => {
            // console.log(item.quantity);
            return total + item.product.price * item.quantity;
        }, 0);
        setorderAmount(totalPrice);
    };

    const handleQuantityChange = (index, value) => {
        const updatedCartData = [...cartData];
        // console.log(updatedCartData);
        const updatedQuantity = Math.max(
            1,
            updatedCartData[index].quantity + value
        );
        // console.log(updatedQuantity);
        updatedCartData[index].quantity = updatedQuantity;
        setCartData(updatedCartData);
        quantity[index] = updatedQuantity;
        calculateorderAmount(updatedCartData);
    };

    //to delete item from cart
    const handleDelete = async (index) => {
        //    { console.log(cartData[index]._id)}

        try {
            setLoading(true);
            const res = await fetch(`/remove/${cartData[index]._id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await res.json();

            if (res.status !== 201 || !data) {
                toast.warning("There is error in deleting item", {
                    position: "top-center",
                });
            }
            else {
                const updatedCartData = cartData.filter((item, i) => i !== index);
                // setCartData(updatedCartData);
                setCartData(data.carts);
                calculateorderAmount(updatedCartData);
                    window.location.reload(false); //set cart value in account also
                toast.warning("Item removed from the cart", {
                    position: "top-center",
                });
            }
            setLoading(false);
        }
        catch (err) {
            alert(err.message);
        }

    };


    const redirectToCheckout = () => {
        setCartData([]);
        // console.log(quantity);
        navigate('/checkout', { state: { orderAmount, quantity, products, price, size } });
    };

    return (

        <section className="cart-section pt-6 pl-6 pr-2 ">
            <div className="cart-container flex justify-between p-6">
                <div className="cart-left w-[40%] flex flex-col px-10 justify-center">
                    {
                        !account?(
                            <div className="flex flex-col items-center mt-16">
                            <CircularProgress />
                            <h2>Loading user info...</h2>
                        </div>
                        ):
                        loading ? (
                        <div className="flex flex-col items-center mt-16">
                            <CircularProgress />
                            <h2>Loading...</h2>
                        </div>
                    ) : cartData.length === 0 ? (
                        <h1>No item in your cart.</h1>
                    ) : (
                        cartData.map((item, index) => (
                            <div
                                key={item.product._id}
                                className="cart-item flex justify-between  w-full my-4 p-4 border border-gray-300 rounded-md">
                                <div className="cart-product-image w-[50%]">
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.product.title}
                                        className="w-36 h-32 mb-4"

                                    />
                                </div>
                                <div className="cart-product-detail w-[50%] ml-4 flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold mb-1">
                                            {item.product.title}
                                        </h2>
                                        <FaHeart className="text-black cursor-pointer" />
                                    </div>
                                    <p className="text-lg mb-2 text-left">
                                        Price: ₹
                                        {item.product.price
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )}
                                        .00 (Selected Size : <strong>{item.size}</strong>)
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
                            <p>₹{orderAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
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
                                ₹{(orderAmount + 10.0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </p>
                        </div>
                        <div className="w-[26.25rem] h-px mx-auto bg-gray-300 order-line "></div>

                        {cartData.length !== 0 && (
                            <button
                                onClick={redirectToCheckout}
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
