import { React, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserLoginLogo } from "../../utils/assets/svg";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/ContextProvider";

const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);

    //if(account)
    // console.log(account);
    // else
    // console.log("account is null")

    let user = 1;
    return (
        <header>
            <nav>
                <div className="left">
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
                    <Link to="/Auth">
                        <div className="nav_btn">Sign In</div>
                    </Link>
                    {account ? (
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
                    ) : (
                        <Link to="/Auth">
                            <div className="cart_btn">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>
                            </div>
                        </Link>
                    )}
                    {account ? (
                        <Link to="/Profile">
                            <Avatar className="avtar" />
                        </Link>
                    ) : (
                        <Link to="/Auth">
                            <UserLoginLogo className="avtar" />
                        </Link>
                    )}

                    {/* {user != null && (
            <Link to="/Cart">
              <div className="cart_btn">
                <Badge badgeContent={1} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </div>
            </Link>
          )}
          {user != null && (
            <Link to="/Profile">
              <UserLoginLogo className="avtar" />
            </Link>
          )}

          {user === null && (
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
