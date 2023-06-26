import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
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
import { useHistory } from "react-router";

function Order(props) {
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
  const history = useHistory();
  const orderId = props.match.params.orderId;  //to retrieve order id
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = () => {
    axios({
      method: "get",
      url: `/admin/order/${orderId}`,
    }).then((response) => {
      setOrder(response.data);
      // console.log(response.data.productIds);
    });
  };

  const updateOrderStatus = (event, status, shippedAt, deliveredAt) => {
    event.preventDefault();
    // console.log(status+"\n");
    // console.log(shippedAt+"\n");
    // console.log(deliveredAt+"\n");
    axios({
      method: "patch",
      url: `/admin/orders/${orderId}`,
      data: {
        status: status,
        shippedAt: shippedAt,
        deliveredAt: deliveredAt,
      },
    }).then((res) => {
      history.push("/orders");
    });
  };

  const deleteOrder = (event) => {
    event.preventDefault();
    axios({
      method: "delete",
      url: `/admin/orders/${orderId}`,
    }).then(() => {
      history.push("/orders");
    });
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="single-order-content" lg={10}>
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
              <Row className="order-actions">
                <Col>
                  <button
                    onClick={(e) => {
                      let date = new Date();
                      const day = weekday[date.getDay()];
                      updateOrderStatus(
                        e,
                        "shipped",
                        `${day}, ${date.getDate()} ${
                          month[date.getMonth()]
                        } ${date.getFullYear()}`,
                        "Not yet delivered"
                      );
                    }}
                  >
                    Order Shipped
                  </button>
                </Col>
                <Col>
                  <button
                    onClick={(e) => {
                      let date = new Date();
                      const day = weekday[date.getDay()];
                      updateOrderStatus(
                        e,
                        "delivered",
                        order.shippedAt,
                        `${day}, ${date.getDate()} ${
                          month[date.getMonth()]
                        } ${date.getFullYear()}`
                      );
                    }}
                  >
                    Order Delivered
                  </button>
                </Col>
                <Col>
                  <button
                    onClick={(e) => {
                      updateOrderStatus(
                        e,
                        "cancelled",
                        order.shippedAt,
                        order.deliveredAt
                      );
                    }}
                  >
                    Order Cancelled
                  </button>
                </Col>
                <Col>
                  <button onClick={deleteOrder}>Delete Order</button>
                </Col>
              </Row>
              <div className="order-products-div">
              {/* {console.log(order.productIds)} */}
                {order.productIds &&
                  order.productIds.map((productId) => {
                    
                    return (
                      <Card className="order-product-card">
                        <Row className="product-card-row">
                          <Col className="product-order-details" lg={10}>
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
                                    <p>Item Total :</p>
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
                                <Row>
                                  <Col lg={2}>
                                    <p>Description :</p>
                                  </Col>
                                  <Col>
                                    <p>
                                      <strong>
                                        {productId.description}
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
  );
}

export default Order;
