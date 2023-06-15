import React from "react";
import "./App.css";
import Footer from "./component/Footer/Footer";
import AllRoutes from "./AllRoutes";
import Navbar from "./component/Navbar/Navbar";

function App() {
    return (
        <div>
            <Navbar />
            <AllRoutes />
            <Footer />
        </div>
    );
}

export default App;
