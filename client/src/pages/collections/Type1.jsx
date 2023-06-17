import React, { useEffect, useState } from 'react'
import DisplayProduct from '../../component/DisplayProduct/DisplayProduct'
import { useParams } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './Type.css'

const Type1 = () => {
  //  const {products} = useSelector(state => state.getproductsdata);
  //  console.log(products);

  const [typeData, setTypeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams("");
  // console.log(id);

  useEffect(() => {

    const gettypedata = async () => {
      try {
        const response = await axios.get(`/collections/${id}`); // Replace with your API endpoint
        setTypeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setTimeout(gettypedata, 1000);
    // gettypedata();
  }, [id]);

  return (
    <>
      {
        loading ? (
          <div className="circle">
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        ) :
          (
            <div className='outer-container'>
              <h1 className='heading'>Type-{id} Collection</h1>
              <hr />
              <p>Total Products on Tanot: {typeData.length} </p>
              <div className='card-flex'>
                {
                  typeData.map((product) => {
                    return <DisplayProduct key={product.id} dataArray={product} />
                  })
                }
              </div>
            </div>
          )
      }
    </>
  )
}

export default Type1
