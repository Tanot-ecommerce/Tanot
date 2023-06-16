import React from 'react'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoginContext } from '../context/ContextProvider';
import "./RightNav.css";
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';



// const usestyle = makeStyles({
//     component: {
//         marginTop: 10,
//         marginRight: "-50px",
//         width: "300px",
//         padding: 50,
//         height: "300px"
//     },
// })


const RightNav = ({ userlog ,logclose}) => {

    const imgd = "/india.png"

    const { account, setAccount } = useContext(LoginContext);

//  this is left drawer bt name is right header

    return (
        <>
        <div className="rightheader">
            <div className="right_nav">
                {
                    account ?
                       <Link to="/Profile">
                        <Avatar className="avtar2"
                             title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}
                        </Avatar> 
                        </Link>:
                        <Link to="/Auth">
                        <Avatar className="avtar" />
                        </Link>
                }
                {account ? <h3>Hello, {account.name.toUpperCase()}</h3> : ""}
            </div>
            <div className="nav_btn" onClick={()=>logclose()}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Shop By Category</NavLink>
                <Divider style={{ width: "100%", marginLeft: -20 }} />
                <NavLink to="/" style={{ marginTop: 10 }}>Today's Deal</NavLink>
                {
                    account ? <NavLink to="/Cart">Your Order</NavLink> : <NavLink to="/Auth">Your Order</NavLink>
                }
                <Divider style={{ width: "100%", marginLeft: -20 }} />
                <div className="flag">
                    <NavLink to="" style={{ marginTop: 14 }}>Settings</NavLink>
                    {/* <img src={imgd} alt="india flag" style={{ width: 35, marginLeft: 10 }} /> */}
                </div>

                {
                    account ?
                        <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => userlog()} style={{ cursor: "pointer", fontWeight: 500 }}>Log Out</h3>
                        </div>
                        : <NavLink to="/login">Sign in</NavLink>
                }


            </div>
        </div>
        </>
    )
}

export default RightNav;