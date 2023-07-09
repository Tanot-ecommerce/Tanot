import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { redirect, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import axios from "axios"
import { CircularProgress } from '@mui/material';
import logo from "../../Images/logo.png"

const Checkout = () => {
    const { state } = useLocation();
    let { orderAmount, quantity, products, price, size } = state || {};
    console.log(quantity);
    const [activeInput, setActiveInput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(orderAmount);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [landmark, setLandmark] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [stat, setStat] = useState(null);
    const [city, setCity] = useState(null);
    const navigate = useNavigate();

    const addStyle = (inputId) => {
        setActiveInput(inputId);
    };

    const getInputStyle = (inputId) => {
        if (inputId === activeInput) {
            return {
                boxShadow: "0 0 5px #449bf7",
                backgroundColor: "#f1f8ff",
            };
        }
        return {};
    };

    useEffect(() => {
        if (!orderAmount) {
            navigate("/");
            setTimeout(() => {
                toast.warning("Action Denied", {
                    position: "top-center",
                });
            }, 2000);
        }
    });

    //for checkout
    const placeOrder = async (payment, rzpOrderId, rzpPaymentId) => {

        // alert(rzpOrderId, rzpPaymentId);

        if (!name || !phone || !landmark || !pincode || !stat || !city) {
            alert("please fill all fields in address field to checkout");
        } else if (name && phone && landmark && pincode && city && stat) {
            setLoading(true);

            const res = await fetch("/place/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderAmount,
                    products,
                    price,
                    size,
                    quantity,
                    payment,
                    name,
                    phone,
                    landmark,
                    pincode,
                    stat,
                    city,
                    rzpOrderId,
                    rzpPaymentId,
                }),
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                // alert("there is error in placing your order");
                setTimeout(() => {
                    toast.warning("There is error in placing your order", {
                        position: "top-center",
                    });
                }, 2000);

                navigate("/cart");
            } else {
                // alert("order Placed Successfully");
                setTimeout(() => {
                    toast.success("Order Placed succefully", {
                        position: "top-center",
                    });
                }, 2000);

                //to redirect user to orders page in this way so that he cant come to checkout again.
                window.history.replaceState(null, '', `/order/${data._id}`);
                window.location.replace(`/order/${data._id}`);
                // navigate(`/order/${data._id}`);
            }

            setLoading(false);
        }
    };

    //to accept payment

    const payNow = async () => {
        //get key
        const { data: { key } } = await axios.get("/getkey")

        const { data: { order } } = await axios.post("/checkout", {
            orderAmount
        });

        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "TANOT",
            description: "Test Transaction",
            image: logo,
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "/paymentverification",
            prefill: {
                "name": name,
                "email": "gaurav.kumar@example.com",
                "contact": phone
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            handler: function (response) {
                // Payment success callback

                //call if they updated
                // if(payment && rzpOrderId && rzpPaymentId)
                // while(!rzpOrderId && !rzpPaymentId);
                placeOrder("Pre Paid", response.razorpay_order_id, response.razorpay_payment_id);
            },
            theme: {
                "color": "#131921"
            }
        };
        const razor = new window.Razorpay(options);

        if (!name || !phone || !landmark || !pincode || !stat || !city) {
            alert("please fill all fields in address field to checkout");
        }
        else
            razor.open();

        // console.log(data);
    }
    return (
        <>
            {loading || !orderAmount ? (
                <div className="circle">
                    <CircularProgress />
                    <h2 style={{ fontSize: "20px", marginLeft: "5px" }}>
                        Placing Order...
                    </h2>
                </div>
            ) : (
                <div className="checkout-container">
                    <h1>Checkout</h1>
                    <div className="checkout-information">
                        <div className="checkout-left">
                            <h2>
                                <b>Please write your address information</b>
                            </h2>
                            <hr></hr>
                            <form>
                                <label htmlFor="fullname">Full name</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    onClick={() => addStyle("fullname")}
                                    style={getInputStyle("fullname")}
                                    placeholder="First and Last name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                ></input>

                                <label htmlFor="number">Contact Number</label>
                                <input
                                    type="number"
                                    id="number"
                                    onClick={() => addStyle("number")}
                                    style={getInputStyle("number")}
                                    placeholder="Contact No."
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                ></input>

                                <label htmlFor="landmark">
                                    Flat, House no., Building, Company,
                                    Apartment
                                </label>
                                <input
                                    type="text"
                                    placeholder="Eg. near Apollo Hospital.."
                                    id="landmark"
                                    onClick={() => addStyle("landmark")}
                                    style={getInputStyle("landmark")}
                                    onChange={(e) => {
                                        setLandmark(e.target.value);
                                    }}
                                ></input>

                                <label htmlFor="city">city</label>
                                <input
                                    type="text"
                                    id="city"
                                    onClick={() => addStyle("city")}
                                    style={getInputStyle("city")}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                ></input>

                                <label htmlFor="pincode">
                                    pincode (Only digits)
                                </label>
                                <input
                                    type="number"
                                    id="pincode"
                                    onClick={() => addStyle("pincode")}
                                    style={getInputStyle("pincode")}
                                    onChange={(e) => {
                                        setPincode(e.target.value);
                                    }}
                                ></input>
                                <label htmlFor='pincode'>pincode (Only digits)</label>
                                <input type='number' id='pincode'
                                    onClick={() => addStyle("pincode")}
                                    style={getInputStyle("pincode")}
                                    onChange={(e) => { setPincode(e.target.value) }}
                                ></input>

                                <label htmlFor='stat'>State</label>
                                <input type='string' id='stat'
                                    onClick={() => addStyle("stat")}
                                    style={getInputStyle("stat")}
                                    onChange={(e) => { setStat(e.target.value) }}
                                ></input>

                            </form>
                        </div>
                        <div className='checkout-right'>
                            <h2><b>Order Summary</b></h2>
                            <hr></hr>
                            <h2 style={{ color: "InfoText" }}><b>Order Total:  &nbsp; &#8377;{orderAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> </h2>
                            <hr></hr>
                            <h2 style={{ textAlign: "center" }}><b>Payment Method</b></h2>
                            <br />
                            <h2><b>1. For Cash On Delievery(COD)</b></h2>
                            <button style={{ backgroundColor: "#FF9900", padding: "2%", borderRadius: "5%", marginTop: "2%" }} onClick={() => { placeOrder("COD", "", ""); }}>place order(COD)</button>
                            <hr></hr>
                            &nbsp; <h2><b>2. For Prepaid Payment(UPI/ Credit card/Debit Card/ Net Banking)</b></h2>
                            <button style={{ backgroundColor: "#FF9900", padding: "2%", borderRadius: "5%", marginTop: "2%" }} onClick={payNow}>Proceed to Payment</button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
    );
};

export default Checkout;
