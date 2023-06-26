import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import "./OrderHistory.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginContext } from "../../component/context/ContextProvider";
// import ProductsData from "../../data/ProductsData"; // Assuming ProductsData.js contains the product information

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [pages, setPages] = useState(5);
    const {account, setAccount} = useContext(LoginContext);

    // console.log(account._id);
    useEffect(() => {
      getOrders();
    }, []);
  
    const getOrders = () => {
      setOrders();
      axios({
        method: "get",
        url: `/orders/${account._id}`,
      }).then((response) => {
        setOrders(response.data);
        // console.log(response.data);
      });
    };
  
    const columns = [
      {
        field: "orderId",
        headerName: "Order ID",
        width: 300,
        renderCell: (params) => {
          const id = params.row.id;
          return <Link to={`/order/${id}`} style={{color:"blue"}}>{params.value}</Link>;
        },
      },
      {
        field: "status",
        headerName: "Order Status",
        width: 180,
      },
      {
        field: "orderAmount",
        headerName: "Order Amount",
        width: 190,
      },
      {
        field: "orderedAt",
        headerName: "Order Date",
        width: 190,
      },
    ];
    return (
        <Col className="orders-content" lg={10}>
          <h4>Orders</h4>
          <p>Here is the list of all the orders please click on order id to see all details of order.</p>
          <hr />
          {orders && (
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
                rows={orders.map((order) => {
                  console.log(order);
                  return {
                    id: order._id,
                    orderId: order.orderId,
                    userId: order.userId.email,
                    userName: order.userId.name,
                    userPhone: order.userId.phone,
                    status:
                      order.status == "placed"
                        ? "Placed"
                        : order.status == "shipped"
                        ? "Shipped"
                        : order.status == "delivered"
                        ? "Delivered"
                        : "Cancelled",
                    orderAmount: `Rs. ${order.orderAmount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/-`,
                    orderedAt: order.orderedAt,
                  };
                })}
                columns={columns}
                pageSize={pages}
                className="orders-data-grid"
                rowsPerPageOptions={[5, 10, 15, 20, 25]}
                onPageSizeChange={(pageSize) => {
                  setPages(pageSize);
                }}
              />
            </div>
          )}
        </Col>
    );
};

export default OrderHistory;
