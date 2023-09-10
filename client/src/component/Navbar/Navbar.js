import { React, useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserLoginLogo } from "../../utils/assets/svg";
import Avatar from "@mui/material/Avatar";
import RightNav from "./RightNav";
import Drawer from '@mui/material/Drawer';
import { LoginContext } from "../context/ContextProvider";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);

    const navigate = useNavigate();
    const [dropen, setdropen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
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
    }
    const handledrclose = () => {
        setdropen(false);
    }

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

    console.log(products);
    const getText = (items) => {
        setText(items);
        setLiopen(false);
    }

    //fetching product list
    const getProductData = async () => {
        try {
            const res = await fetch("/getproducts", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            // console.log(data);
            if (res.status === 201) {
                console.log("data valid");
                setProductsdata(data);
            } else {
                console.log("search cant access product list");
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }


    useEffect(() => {
        getProductData();
        getDetailValidUser();
    }, []);



    //if(account)
    // console.log(account);
    // else
    // console.log("account is null")

    return (
        <header>
            <nav>
                <div className="left">

                    <IconButton className="hamburgur" onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} className="Menu-icon" />
                    </IconButton>

                    <Drawer open={dropen} onClose={handledrclose}>
                        <RightNav logclose={handledrclose} logoutUser={logOutUser}/>
                    </Drawer>
                    <Link to="/">
                        <div className="navlogo">
                            <img src={logo} alt="logo" />
                        </div>
                    </Link>
                    <div className="nav_searchbaar">
                        <input type="text" name=""
                            placeholder="Search your products"
                            onChange={(e) => getText(e.target.value)}
                            id="" />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>

                        {/* search filter */}
                        {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                {
                                    products.filter(product => product.title.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/productdetail/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    </div>
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

                        <Avatar className="avtar"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick} />
                    )}
                    {!account && (
                        <Link to="/Auth">
                            <div className="nav_btn">Sign In</div>
                        </Link>
                    )}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={() => { handleClose(); logOutUser(); }} > <LogoutIcon style={{ marginRight: "3", fontSize: "16" }} />Logout</MenuItem>


                    </Menu>

                    {/* {account != null && (
            <Link to="/Cart">
              <div className="cart_btn">
                <Badge badgeContent={1} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </div>
            </Link>
          )}
          {account != null && (
            <Link to="/Profile">
              <userLoginLogo className="avtar" />
            </Link>
          )}

          {account === null && (
            <div className="nav_btn">
              <Link to="/Auth">Sign In</Link>
            </div>
          )} */}
                </div>
            </nav>
            <div className="nav_bottom">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Shop">Shop</Link>
                    </li>
                    <li>
                        <Link to="/About">About</Link>
                    </li>
                    <li>
                        <Link to="/Contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
