import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserLoginLogo } from "../../utils/assets/svg";
import RightNav from "./RightNav";
import Drawer from "@mui/material/Drawer";
import { LoginContext } from "../context/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ModalForm from "../ModalForm/ModalForm";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const { account, setAccount } = useContext(LoginContext);

    const navigate = useNavigate();
    const [dropen, setdropen] = useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getDetailValidUser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        // console.log(data);
        if (res.status === 201) {
            console.log("data valid");
            setAccount(data);
        } else {
            console.log("cookies error");
        }
    };

    const handleopen = () => {
        setdropen(true);
    };
    const handledrclose = () => {
        setdropen(false);
    };

    const logOutUser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data2 = await res2.json();
        // console.log(data2);
        if (res2.status === 201) {
            console.log("data valid");
            alert("logout successfully");
            navigate("/");
            setAccount(false);
        } else {
            console.log("cookies error");
        }
    };

    //for searching
    const [text, setText] = useState("");
    // console.log(text);
    const [liopen, setLiopen] = useState(true);

    const [products, setProductsdata] = useState();
    const [suggestions, setSuggestions] = useState([]);

    console.log(products);

    const getText = (items) => {
        setText(items);

        if (items === "") {
            setSuggestions([]);
            setLiopen(true);
            return;
        }

        setLiopen(false);

        const filteredSuggestions = products.filter((product) =>
            product.title.toLowerCase().includes(items.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    //fetching product list
    const getProductData = async () => {
        try {
            const res = await fetch("/getproducts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            console.log(data); // Check the value of data
            if (res.status === 201) {
                console.log("data valid");
                setProductsdata(data);
            } else {
                console.log("search can't access product list");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        getProductData();
        getDetailValidUser();
    }, []);

    const handleMyAccountClick = () => {
        handleClose();
        navigate("/profile");
    };

    //to handle model form
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header className="header-container">
            <div className="navbar-container">
                <div className="navbar-top-container p-5">
                    <Link to="/">
                        <div className="navlogo">
                            <img src={logo} alt="logo" />
                        </div>
                    </Link>
                    <div className="nav_searchbaar">
                        <input
                            type="text"
                            name=""
                            placeholder="Search your products"
                            onChange={(e) => getText(e.target.value)}
                            id=""
                        />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>

                        {text && (
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                {suggestions.map((product) => (
                                    <MenuItem
                                        key={product.id}
                                        onClick={() => {
                                            handleCloseMenu();
                                            navigate(
                                                `/productdetail/${product.id}`
                                            );
                                        }}
                                    >
                                        {product.title}
                                    </MenuItem>
                                ))}
                            </Menu>
                        )}
                    </div>
                    <div className="right">
                        {account && (
                            <Link to="/Cart">
                                <div className="cart_btn">
                                    <Badge
                                        badgeContent={account.carts.length}
                                        color="primary"
                                    >
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                </div>
                            </Link>
                        )}

                        {account && (
                            <UserLoginLogo
                                className="avtar"
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            />
                        )}
                        {!account && (
                            <Link to="/Auth">
                                <div className="navbar_btn">Sign In</div>
                            </Link>
                        )}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={handleMyAccountClick}>
                                My account
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    logOutUser();
                                }}
                            >
                                <LogoutIcon
                                    style={{ marginRight: "3", fontSize: "16" }}
                                />
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                    <Drawer open={dropen} onClose={handledrclose}>
                        <RightNav
                            logclose={handledrclose}
                            logoutUser={logOutUser}
                        />
                    </Drawer>
                </div>
                <div className="navbar-bottom-container px-3 flex justify-between items-center">
                    <div className="bottom-left flex items-center">
                        <IconButton className="hamburgur" onClick={handleopen}>
                            <MenuIcon
                                style={{ color: "#fff" }}
                                className="Menu-icon"
                            />
                        </IconButton>
                        <ul className="ml-2">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/aboutus">AboutUs</Link>
                            </li>
                            <li>
                                <Link to="/#footer">Contact</Link>
                            </li>
                            <li>
                                <Link onClick={openModal}>Feedback</Link>
                                <ModalForm
                                    isOpen={isModalOpen}
                                    onClose={closeModal}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-right text-white text-right">
                        <h3>New Collection is coming soon!</h3>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
