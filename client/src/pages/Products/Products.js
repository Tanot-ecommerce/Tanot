import React from 'react'
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import DisplayProduct from '../../component/DisplayProduct/DisplayProduct';
import '../collections/Type.css'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setProducts([]);
        await axios({
            method: "get",
            url: "/getproducts",
        }).then((response) => {
            setProducts(response.data);
        });
        setLoading(false);
    };


    return (
        <>
            <h1>All Products on website</h1>
            {
                loading ? (
                    <div className="circle">
                        <CircularProgress />
                        <h2>Loading Products...</h2>
                    </div>
                ) :
                    (
                        <div className='card-flex'>
                            {
                                products.map((product) => {
                                    return <DisplayProduct key={product.id} dataArray={product} />
                                })
                            }
                        </div>
                    )
            }
        </>
    )
}

export default Products
