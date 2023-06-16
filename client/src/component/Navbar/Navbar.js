import { React, useContext, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserLoginLogo } from "../../utils/assets/svg";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/ContextProvider";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);

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

    useEffect(() => {
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

                    <IconButton className="hamburgur">
                        <MenuIcon style={{color:"#fff"}} className="Menu-icon"/>
                    </IconButton>

                    <Link to="/">
                        <div className="navlogo">
                            <img src={logo} alt="logo" />
                        </div>
                    </Link>
                    <div className="nav_searchbaar">
                        <input type="text" name="" id="" />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>
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
                        <Link to="/Profile">
                            <Avatar className="avtar" />
                        </Link>
                    )}
                    {!account && (
                        <Link to="/Auth">
                            <div className="nav_btn">Sign In</div>
                        </Link>
                    )}

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
