import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer/Footer";
import AllRoutes from "./AllRoutes";
import Navbar from "./component/Navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
    const [data, setData] = useState(false);
    const location = useLocation();
    const { state } = location;

    useEffect(() => {

        if (location.pathname !== '/checkout') {
            // Clear the orderAmount value
            console.log(state);
            if (state && state.orderAmount) {
                alert(state.orderAmount);
                delete state.orderAmount;
            }
        }
     setData(true);
    }, [location]);

    return (
        <>
            <Navbar />
            {data ? (
                <>
                    <AllRoutes />
                </>
            ) : (
                <div className="circle">
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div>
            )}
            <Footer />
        </>
    );
}

export default App;
