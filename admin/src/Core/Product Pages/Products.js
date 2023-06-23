import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { RiDeleteBin3Line, RiEditLine } from "react-icons/ri";

import "./Products.css";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async() => {
    setProducts([]);
   await axios({
      method: "get",
      url: "/getproducts",
    }).then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
  };

  const deleteProduct = async(productId) => {
    await axios({
      method: "delete",
      url: `/deleteProduct/${productId}`,
    }).then((response) => {
      // console.log(response.data);
      getProducts();
    });
  };


  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="products-content" lg={10}>
          <Row>
            <Col lg={8}>
              <h4>Products</h4>
              <p>Below are the products currently added to your website.</p>
            </Col>
          </Row>
          <hr />
          <Row className="products-row">
            {filteredProducts.map((product) => {
              {/* console.log(product.price); */}
              const commaCost = product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return (
                <Col lg={3}>
                  <Card className="product-card">
                    <img
                      src={`${product.images[0]}`}
                      alt={product.name}
                    />
                    <h5>{product.title}</h5>
                    <p>Cost : Rs. {commaCost}/-</p>
                    <Link to={`/products/edit/${product._id}`}>
                      <RiEditLine className="product-card-icon edit-icon" />
                    </Link>
                    <RiDeleteBin3Line
                      onClick={(event) => {
                        event.preventDefault();
                        deleteProduct(product._id);
                      }}
                      className="product-card-icon delete-icon"
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Products;
