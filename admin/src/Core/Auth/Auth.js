import React, {useContext, useState} from 'react'
import ContextProvider, { LoginContext } from '../../Components/contextProvider'
import { Col, Row, Button} from "react-bootstrap";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import Sidebar from '../../Components/Sidebar'
import './Auth.css'

export default function Auth() {

    const {account, setAccount} =useContext(LoginContext);
    const history = useHistory("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    // { console.log(account); }
    // if(account){
    //  history.push("/");
    // }

const submit = async (e) => {
    e.preventDefault();
    try {

        await axios({
            method: "post",
            url: "/adminlogin",
            data: {
                email:email,
                password:password,
              },
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
          }).then(async (response) => {
            if (response.status === 201) {
                history.push("/");
            }
            else{
                alert("Login falied");
            }
        })
      
    } catch (err) {
      alert(`authentication error, sServer Error ${err.response.status}`)
    }
  };

    return (
        <div className='dashboard-parent-div'>
        <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="complaints-content" lg={10}>
          <h4 style={{textAlign:"center"}}>Login</h4>
          
        <div className="text-center m-10-auto">
            <h2>Sign in to Admin</h2>
            <form action="/home">
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name="first_name" onChange={(e)=>{setEmail(e.target.value); console.log(email);}} required />
                </p>
                <p>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} required />
                </p>
                <p>
                {/* {console.log(email)} */}
                    <Button id="sub_btn" type="submit" onClick={submit} className='my-3 px-4 py-2'>Login</Button>
                </p>
            </form>
        </div>
        </Col>
        </Row>
        </div>
    )
}