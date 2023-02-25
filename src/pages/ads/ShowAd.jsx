import React from "react";
import "./showAd.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const ShowAd = () => {
    return (
        <div className="showAd">
          <Sidebar />
          <div className="showAdContainer">
          <Navbar />
          showAd
          </div>
        </div>
      );
}

export default ShowAd;