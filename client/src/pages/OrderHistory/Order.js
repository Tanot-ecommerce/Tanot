import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  RiMailLine,
  RiPhoneLine,
  RiHome2Line,
  RiUser3Line,
  RiUserLocationLine,
  RiCalendarEventLine,
  RiCalendarTodoLine,
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
  RiQuestionLine,
  SiCashapp
} from "react-icons/ri";

import "./Order.css";
import { useNavigate, useParams } from "react-router";
import { CircularProgress } from '@mui/material';


const Order = () => {
  const [order, setOrder] = useState({});
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const orderId = useParams("");  //to retrieve order id
  //   console.log(orderId.id);
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = () => {
    setLoading(true);
    axios({
      method: "get",
      url: `/order/${orderId.id}`,
    }).then((response) => {
      setOrder(response.data);
      // console.log(response.data.productIds);
    });
    setLoading(false);
  };

  return (
    <div className="dashboard-parent-div">
      {
        loading ? (
          <div className="circle">
            {/* <CircularProgress /> */}
            <h2>Loading Order details..</h2>
          </div>
        ):(
      <Row>
        <Col className="single-order-content" lg={12}>
          {order && order.userId && (
            <Card className="order-card">
              <Row className="order-user-details">
                <Col>
                  <Row>
                    <Col className="user-detail-col">
                      <p>
                        <RiUser3Line className="user-icon" />{" "}
                        {order.userId.name}
                      </p>
                      <p>
                        <RiPhoneLine className="user-icon" />{" "}
                        {order.address.phone}
                      </p>
                      <p>
                        <RiMailLine className="user-icon" />{" "}
                        {order.userId.email}
                      </p>
                      <p>
                        <RiHome2Line className="user-icon" />{" "}
                        {order.address.name}, {order.address.landmark} -{" "}
                        {order.address.city}, ({order.address.pincode})
                      </p>
                      <p>
                        <RiUserLocationLine className="user-icon" />{" "}
                        {order.address.state}
                      </p>
                    </Col>
                    <Col className="order-detail-col">
                      <p>
                        <RiQuestionLine className="order-icon" />{" "}
                        {order.status == "placed"
                          ? "Placed"
                          : order.status == "shipped"
                            ? "Shipped"
                            : order.status == "delivered"
                              ? "Delivered"
                              : "Cancelled"}
                      </p>
                      <p>
                        <RiMoneyDollarCircleLine className="order-icon" />{" "}
                        {`Rs. ${order.orderAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-`}
                      </p>
                      <p>
                        <RiCalendarEventLine className="order-icon" />{" "}
                        {order.orderedAt}
                      </p>
                      <p>
                        <RiCalendarTodoLine className="order-icon" />{" "}
                        {order.shippedAt}
                      </p>
                      <p>
                        <RiCalendarCheckLine className="order-icon" />{" "}
                        {order.deliveredAt}
                      </p>
                      <p><b>Payment:  {order.payment} </b></p>
                      <p><b>Payment Id: {order.rzpPaymentId}</b></p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="order-products-div">
                {order.productIds &&
                  order.productIds.map((productId, index) => {
                    return (
                      <Card className="order-product-card">
                        <Row className="product-card-row">
                          <Col className="product-order-details" lg={12}>
                            <Row>
                              <Col>
                                <Row>
                                  <Col lg={2}>
                                    <p>Name :</p>
                                  </Col>
                                  <Col>
                                    <p>
                                      <strong>{productId.title}</strong>
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={2}>
                                    <p>Price :</p>
                                  </Col>
                                  <Col>
                                    <p>
                                      <strong>
                                        Rs.{" "}
                                        {productId.price
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                        /-
                                      </strong>
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={2}>
                                    <p>Category :</p>
                                  </Col>
                                  <Col>
                                    <p>
                                      <strong>{productId.category}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <Row>
                                  <Col lg={2}>
                                    <p>Size : <strong>{order.size[index]}</strong></p>
                                  </Col>
                                  <Col>
                                    <p>
                                      Quantity :<strong>{order.quantity[index]}</strong>
                                    </p>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={2}>
                                    <p>Item Total :</p>
                                  </Col>
                                  <Col>
                                    <p>
                                      <strong>
                                        Rs.&nbsp;
                                        {(productId.price*order.quantity[index])
                                          .toString()
                                          .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                        /-
                                      </strong>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
              </div>
            </Card>
          )}
        </Col>
      </Row>
      )}
    </div>
  )
}

export default Order
