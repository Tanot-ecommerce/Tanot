import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditProduct.css";
// import { useNavigate } from "react-router-dom";

function EditProduct(props) {
  const [productData, setProductData] = useState();
  const { productId } = useParams("");
  useEffect(() => {
    // getCategories();
    getProduct();
  }, []);

  const getProduct = () => {
    setProductData();
    axios({
      method: "get",
      url: `/products/edit/${productId}`,
    })
      .then((response) => {
        // alert("hi");
        // console.log(response.data);
        setProductData(response.data);
        // console.log(productData);
      })
      .catch((err) => {
        console.log("Error : " + err.message);
      });
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prev) => {
      return { ...prev, [name]: value };
    });
  };


  const editProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("mrp", productData.mrp);
      formData.append("price", productData.price);
      formData.append("discount", productData.discount);
      // formData.append("S_stock", productData.S_stock);
      // formData.append("M_stock", productData.M_stock);
      // formData.append("L_stock", productData.L_stock);
      // formData.append("XL_stock", productData.XL_stock);
      // formData.append("XXL_stock", productData.XXL_stock);
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      formData.append("images", productData.images);
      formData.append("fabric", productData.fabric);
      formData.append("pattern", productData.pattern);
      formData.append("sleeveLength", productData.sleeveLength);
      // console.log(formData.get("title"));

      axios({
        method: "patch",
        url: `/products/update/${productId}`,
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setProductData({
          title: "",
          mrp: "",
          price: "",
          discount: "",
          S_stock: "",
          M_stock: "",
          L_stock: "",
          XL_stock: "",
          XXL_stock: "",
          category: "",
          description: "",
          fabric: "",
          sleeveLength: "",
          pattern: "",
        });
        alert("product updated");
      });
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="add-product-content" lg={10}>
          <h4>Update Product</h4>
          {productData && (
            <p>
              Please fill the product details in the form below to update{" "}
              <strong>{productData.title}</strong>.
            </p>
          )}
          <Card className="add-product-form-card">
            {productData && (
              <div>
                <Row>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Product Name</p>
                      <input
                        type="text"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Product MRP</p>
                      <input
                        type="number"
                        name="mrp"
                        value={productData.mrp}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Product Price</p>
                      <input
                        type="text"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Discount (in %)</p>
                      <input
                        type="number"
                        name="discount"
                        value={productData.discount}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                </Row>
                <Row>
                <Col>
                <div className="add-product-input-div">
                  <p>Product Category</p>
                  <select
                    className="add-product-dropdown"
                    name="category"
                    id="category"
                    value={productData.category}
                    onChange={handleChange}
                  >
                    <option className="add-product-dropdown-option">
                      select option
                    </option>
                    <option className="add-product-dropdown-option">
                    Casual wear 
                    </option>
                    <option className="add-product-dropdown-option">
                    Ethnic wear
                    </option>
                    <option className="add-product-dropdown-option">
                    Feeding gown
                    </option>
                  </select>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Sleeve length</p>
                  <select
                    className="add-product-dropdown"
                    name="sleeveLength"
                    id="sleeveLength"
                    value={productData.sleeveLength}
                    onChange={handleChange}
                  >
                    <option className="add-product-dropdown-option">
                      select option
                    </option>
                    <option className="add-product-dropdown-option">
                      Short Sleeve
                    </option>
                    <option className="add-product-dropdown-option">
                      Half Sleeve
                    </option>
                    <option className="add-product-dropdown-option">
                      Three-Quarter Sleeve
                    </option>
                    <option className="add-product-dropdown-option">
                      Full Sleeve
                    </option>
                  </select>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Pattern</p>
                  <input
                    type="text"
                    name="pattern"
                    value={productData.pattern}
                    onChange={handleChange}
                    autoComplete="off"
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Fabric</p>
                  <input
                    type="text"
                    name="fabric"
                    value={productData.fabric}
                    onChange={handleChange}
                    autoComplete="off"
                  ></input>
                </div>
              </Col>
              </Row>
              <Row>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Stock Quantity (S - Size)</p>
                      <input
                        type="number"
                        name="S_stock"
                        min={0}
                        value={productData.S_stock}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Stock Quantity (M - Size)</p>
                      <input
                        type="number"
                        name="M_stock"
                        min={0}
                        value={productData.M_stock}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Stock Quantity (L - Size)</p>
                      <input
                        type="number"
                        name="L_stock"
                        min={0}
                        value={productData.L_stock}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Stock Quantity (XL - Size)</p>
                      <input
                        type="number"
                        name="XL_stock"
                        min={0}
                        value={productData.XL_stock}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Stock Quantity (XXL - Size)</p>
                      <input
                        type="number"
                        name="XXL_stock"
                        min={0}
                        value={productData.XXL_stock}
                        onChange={handleChange}
                        autoComplete="off"
                      ></input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Product Description</p>
                      <textarea
                        rows={8}
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </Col>
                </Row>
                <button onClick={editProduct} className="add-product-btn">
                  Update Product
                </button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditProduct;