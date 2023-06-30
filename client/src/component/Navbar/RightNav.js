import React, { useContext, useState } from "react";
import { Avatar } from "@mui/material";
import { grey, deepPurple } from "@mui/material/colors";
import { LoginContext } from "../context/ContextProvider";
import { Link, NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaUserCircle } from "react-icons/fa";
import { Divider } from "@mui/material";
import "./RightNav.css";
import ModalForm from "../ModalForm/ModalForm";

const RightNav = ({ logclose, logoutUser }) => {
    // To handle modal form
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { account } = useContext(LoginContext);

    return (
        <>
            <div className="rightheader">
                <div className="right_nav flex justify-between">
                    {account ? (
                        <div className="user-info">
                            <div className="avatar2 flex items-center justify-center">
                                {account.profilePicture ? (
                                    <Avatar
                                        src={account.profilePicture}
                                        alt="Profile Picture"
                                    />
                                ) : (
                                    <Avatar
                                        sx={{ bgcolor: grey[800] }}
                                        alt={account.name}
                                    >
                                        {account.name[0].toUpperCase()}
                                    </Avatar>
                                )}
                                {account && <Link to="/Profile"> <h3>Hello, {account.name.toUpperCase()} </h3></Link>}                            </div>
                        </div>
                    ) : (
                        <Avatar
                            sx={{ bgcolor: grey[800] }}
                            alt="profile-icon"
                        >
                        </Avatar>
                    )
                    }
                    {account && (
                        <NavLink to="/Cart">
                            <div className="cart_btn">
                                <Badge
                                    badgeContent={account.carts.length}
                                    color="primary"
                                >
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </div>
                        </NavLink>
                    )}

                </div>

                <div className="nav_btn" onClick={() => logclose()}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/aboutus">AboutUs</NavLink>
                    <NavLink to="/#shopByCategory">Shop By Category</NavLink>

                    <Divider
                        style={{
                            width: "100%",
                            marginLeft: "-20px",
                            marginBottom: "20px",
                        }}
                    />

                    <NavLink to="/products">Today's deal</NavLink>
                    {account ? (
                        <NavLink to="/Cart">Your Orders</NavLink>
                    ) : (
                        <NavLink to="/Auth">Your Orders</NavLink>
                    )}
                    {account ? (
                        <NavLink to="/profile">Your Profile</NavLink>
                    ) : (
                        <NavLink to="/Auth">Your Profile</NavLink>
                    )}

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />
                    {/* <li style={{ listStyleType: "none" }}>
                        <Link
                            className="bg-black text-white rounded px-3 py-2 my-4"
                            style={{zIndex:"5000"}}
                            onClick={openModal}>
                            Feedback
                        </Link>
                        <ModalForm
                            isOpen={isModalOpen}
                            onClose={closeModal}/>
                    </li> */}

                    {account ? (
                        <div className="flag mt-4">
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
            {isModalOpen && (
                <ModalForm isOpen={isModalOpen} onClose={closeModal} />
            )}
        </>
    );
};

export default RightNav;
