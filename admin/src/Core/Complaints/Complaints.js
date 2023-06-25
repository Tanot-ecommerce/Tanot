import React, { useEffect, useState } from "react";
import { Col, Row, Button} from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { DataGrid } from "@mui/x-data-grid";

import "./Complaints.css";
import axios from "axios";
// import { Link } from "react-router-dom";

const deleteComplaint = async (id) => {
  try {
    const response = await axios.delete(`/admin/complaint/${id}`);
    // Handle the response as needed
    if (response.status === 204) {
      // The complaint was deleted successfully
      alert('Complaint deleted successfully please refresh page.');
      // Perform any additional actions if needed
    } else {
      // Handle unexpected response status codes
      console.log('Unexpected response:', response.status);
    }
    
  } catch (err) {
    alert(`complaint not removed.Server Error ${err.response.status}`)
  }
};

const columns = [
  {
    field: "email",
    headerName: "Customer ID",
    width: 250,
    autoHeight: true,
    // renderCell: (params) => {
    //   return <Link to={`/users/${params.value}`}>{params.value}</Link>;
    // },
  },
  {
    field: "name",
    headerName: "Customer name",
    width: 240,
    autoHeight: true,
  },
  {
    field: "number",
    headerName: "Customer Phone",
    width: 180,
    autoHeight: true,
  },
  {
    field: "orderId",
    headerName: "Order ID",
    width: 100,
    autoHeight: true,
    // renderCell: (params) => {
    //   return <Link to={`/orders/${params.value}`}>{params.value}</Link>;
    // },
  },
  {
    field: "complaint",
    headerName: "Feedback & Complaints",
    width: 250,
    autoHeight: true,
  },
  {
    field:"deleteComplaint",
    headerName:"Solved? (Delete)",
    width:200,
    autoHeight:true,
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          // color="warning"
          onClick={() => deleteComplaint(params.value)}
          className="c-delete-btn"
        >
        Delete  
        </Button>
      );
    },
  },
];


function Complaints() {
  const [pages, setPages] = useState(5);
  const [complaints, setComplaints] = useState([]);
  //set loading
  const [loading, setLoading] = useState(true);

  function setRows(item, index) {
    // console.log(item.id);
    const row = {
      id: index + 1,
      email: item.id,
      name: item.name,
      number: item.number,
      orderId: item.orderId,
      complaint: item.complaint,
      deleteComplaint: item._id
    };

    setComplaints((prevComplaints) => [
      ...prevComplaints,
      row,
    ]);

  }
  const getComplaints = async () => {
    try {

      const response = await axios.get("/admin/complaints");
      const data = response.data;

      data.forEach(setRows);

      setLoading(false);
      // console.log(complaints);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setComplaints([]);
    getComplaints();
  }, []);
  
 

 



  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="complaints-content" lg={10}>
          <h4>Complaints & Feedbacks</h4>
          <p>
            Below are all the feedbacks and complaints provided by your
            customers.
          </p>
          <hr />
          {
            loading ? <div>
              <h1>Loading</h1> 
              <h3>It's good to delete complaints those are spam and those you have solved </h3> 
              </div>:
              <DataGrid
                rows={complaints}
                columns={columns}
                getRowHeight={() => 'auto'}
                getRowId={(row) => row.id}
                
              />
          }

        </Col>
      </Row>
    </div>
  );
}

export default Complaints;
