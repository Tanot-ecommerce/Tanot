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
} from "react-icons/ri";

import "./Order.css";
import { useNavigate, useParams } from "react-router";
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
  const navigate = useNavigate();
  const orderId = useParams("");  //to retrieve order id
//   console.log(orderId.id);
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = () => {
    axios({
      method: "get",
      url: `/order/${orderId.id}`,
    }).then((response) => {
      setOrder(response.data);
      // console.log(response.data.productIds);
    });
  };

  return (
    <div className="dashboard-parent-div">
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
                      {order.userId.phone}
                    </p>
                    <p>
                      <RiMailLine className="user-icon" />{" "}
                      {order.userId.email}
                    </p>
                    <p>
                      <RiHome2Line className="user-icon" />{" "}
                      {order.userId.address}, {order.userId.city} -{" "}
                      {order.userId.pin}
                    </p>
                    <p>
                      <RiUserLocationLine className="user-icon" />{" "}
                      {order.userId.state}
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
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="order-products-div">
              {order.productIds &&
                order.productIds.map((productId) => {
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
                                  <p>Size : <strong>{productId.size}</strong></p>
                                </Col>
                                <Col>
                                  <p>
                                    Quantity :<strong> 1</strong>
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={2}>
                                  <p> Total :</p>
                                </Col>
                                <Col>
                                  <p>
                                    <strong>
                                      Rs.&nbsp;
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
      
    </div>
  )
}

export default Order
