import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";

import "./AddProduct.css";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    desc: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setCategories([]);
    axios({
      method: "get",
      url: "https://ecommerceappcj.herokuapp.com/api/categories/",
    }).then(function (response) {
      setCategories(response.data.categories);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const imageButtonRef = useRef();
  const types = ["image/png", "image/jpeg", "image/jpg"];

  function handleImageChange(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setImage(null);
    }
  }

  const addProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("categoryName", newProduct.category);
      formData.append("image", image);
      formData.append("price", newProduct.price);
      formData.append("stockQuantity", newProduct.stock);
      formData.append("description", newProduct.desc);
      axios({
        method: "post",
        url: "https://ecommerceappcj.herokuapp.com/api/products/create/product/",
        data: formData,
      }).then((response) => {
        setImagePreview();
        setNewProduct({
          name: "",
          price: "",
          stock: "",
          category: "",
          desc: "",
        });
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
          <h4>Add Product</h4>
          <p>
            Please fill the product details in the form below to add a new
            product.
          </p>
          <Card className="add-product-form-card">
            <Row>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Name</p>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Product MRP</p>
                  <input
                    type="text"
                    name="mrp"
                    value={newProduct.mrp}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Price</p>
                  <input
                    type="text"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Discount (in %)</p>
                  <input
                    type="text"
                    name="discount"
                    value={newProduct.discount}
                    onChange={handleChange}
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
                    value={newProduct.category}
                    onChange={handleChange}
                  >
                    <option className="add-product-dropdown-option">
                      option 1
                    </option>
                    <option className="add-product-dropdown-option">
                      option 2
                    </option>
                    <option className="add-product-dropdown-option">
                      option 3
                    </option>
                  </select>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Stock Quantity (S - Size)</p>
                  <input
                    type="number"
                    name="s-stock"
                    min={0}
                    value={newProduct.stock}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Stock Quantity (M - Size)</p>
                  <input
                    type="number"
                    name="m-stock"
                    min={0}
                    value={newProduct.stock}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Stock Quantity (L - Size)</p>
                  <input
                    type="number"
                    name="L-stock"
                    min={0}
                    value={newProduct.stock}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Stock Quantity (XL - Size)</p>
                  <input
                    type="number"
                    name="XL-stock"
                    min={0}
                    value={newProduct.stock}
                    onChange={handleChange}
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Stock Quantity (XXL - Size)</p>
                  <input
                    type="number"
                    name="XXL-stock"
                    min={0}
                    value={newProduct.stock}
                    onChange={handleChange}
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
                    name="desc"
                    value={newProduct.desc}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </Col>
            </Row>
            <button onClick={addProduct} className="add-product-btn">
              Add Product
            </button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AddProduct;
