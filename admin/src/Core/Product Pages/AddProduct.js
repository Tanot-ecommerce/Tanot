import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";

import "./AddProduct.css";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
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
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [images, setImages] = useState([]);

  // function handleImageChange(event) {
  //   let selectedFile = event.target.files[0];
  //   if (selectedFile && types.includes(selectedFile.type)) {
  //     setImage(selectedFile);
  //     setImagePreview(URL.createObjectURL(selectedFile));
  //   } else {
  //     setImage(null);
  //   }
  // }

  // const handleImageChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   const validFiles = selectedFiles.filter(
  //     (file) => types.includes(file.type)
  //   );

  //   setImages(validFiles);
  // };

  const addProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("mrp", newProduct.mrp);
      formData.append("price", newProduct.price);
      formData.append("discount", newProduct.discount);
      formData.append("S_stock", newProduct.S_stock);
      formData.append("M_stock", newProduct.M_stock);
      formData.append("L_stock", newProduct.L_stock);
      formData.append("XL_stock", newProduct.XL_stock);
      formData.append("XXL_stock", newProduct.XXL_stock);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      // console.log(formData.get("title"));

      // Append the imageFiles array to the formData as a single field
      images.forEach((image) => {
        formData.append("images", image);
      });
      // console.log("images"+images);
      // Log the formData to check if the images were uploaded correctly
      // console.log("FormData:", formData.get("images"));

      await axios({
        method: "post",
        url: "/products/add",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(async (response) => {
        if (response.status == 201) {
          // setImagePreview();
          setImages([]);
          setNewProduct({
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
          });
          alert("data added");
        }
        else {
          alert("data not added")
        }
      });
    } catch (err) {
      alert("Product not added to site. Please fill all the filds of form.")
      console.log("Error : " + err.message);
    }
  };

  const imagesHandle = (event) => {
    const inputValue = event.target.value;
    setImages(prevImages => [...prevImages, inputValue]);
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
                    name="title"
                    value={newProduct.title}
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
                    value={newProduct.mrp}
                    onChange={handleChange}
                    autoComplete="off"
                  ></input>
                </div>
              </Col>
              <Col>
                <div className="add-product-input-div">
                  <p>Product Price</p>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
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
                    value={newProduct.discount}
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
                    value={newProduct.category}
                    onChange={handleChange}
                  >
                    <option className="add-product-dropdown-option">
                      select option
                    </option>
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
                    name="S_stock"
                    min={0}
                    value={newProduct.S_stock}
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
                    value={newProduct.M_stock}
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
                    value={newProduct.L_stock}
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
                    value={newProduct.XL_stock}
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
                    value={newProduct.XXL_stock}
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
                    value={newProduct.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </Col>
            </Row>
            <p>Paste Urls of Image. To get url please &nbsp;
              <a href="https://imgur.com/upload" target="__blank"> click here</a>
              .
            </p>
            <div className="add-product-input-div">
              <input type="text" name="url1" placeholder="Image url" onChange={imagesHandle} autoComplete="off" />
            </div>
            <div className="add-product-input-div">
              <input type="text" name="url2" placeholder="Image url" onChange={imagesHandle} autoComplete="off" />
            </div>
            <div className="add-product-input-div">
              <input type="text" name="url3" placeholder="Image url" onChange={imagesHandle} autoComplete="off" />
            </div>
            <div className="add-product-input-div">
              <input type="text" name="url4" placeholder="Image url" onChange={imagesHandle} autoComplete="off" />
            </div>
            <div className="add-product-input-div">
              <input type="text" name="url5" placeholder="Image url" onChange={imagesHandle} autoComplete="off" />
            </div>
            <div className="add-product-input-div">
              <input type="text" name="url6" placeholder="Image url" onChange={imagesHandle} autoComplete="off" />
            </div>
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
