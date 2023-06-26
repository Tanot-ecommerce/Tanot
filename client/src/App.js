import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./component/Footer/Footer";
import AllRoutes from "./AllRoutes";
import Navbar from "./component/Navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
    const [data, setData] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setData(true);
        }, 2500);
    }, []);

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
