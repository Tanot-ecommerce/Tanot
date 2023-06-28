import React, { useContext } from "react";
import { LoginContext } from "../context/ContextProvider";
import { Link, NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserLoginLogo } from "../../utils/assets/svg";
import { Divider } from "@mui/material";
import "./RightNav.css";

const RightNav = ({ logclose, logoutUser }) => {
    const { account, setAccount } = useContext(LoginContext);

    return (
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {account ? (
                        <UserLoginLogo className="avatar2">
                            {account.name[0].toUpperCase()}
                        </UserLoginLogo>
                    ) : (
                        <UserLoginLogo className="avatar"></UserLoginLogo>
                    )}
                    {account &&  <Link to="/Profile"> <h3>Hello, {account.name.toUpperCase()} </h3></Link>}
                </div>
                <div className="nav_btn" onClick={() => logclose()}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Shop By catagory</NavLink>

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />

                    <NavLink to="/">Today's deal</NavLink>
                    {account ? (
                        <NavLink to="/Cart">Your Orders</NavLink>
                    ) : (
                        <NavLink to="/Auth">Your Orders</NavLink>
                    )}

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    {account ? (
                        <div className="flag">
                            <LogoutIcon
                                style={{ fontSize: "18", marginRight: "4" }}
                            />
                            <h3
                                style={{ cursor: "pointer", fontWeight: "500" }}
                                onClick={() => logoutUser()}
                            >
                                Logout
                            </h3>
                        </div>
                    ) : (
                        <NavLink to="/Auth">Sign In</NavLink>
                    )}
                </div>
            </div>
        </>
    );
};

export default RightNav;
