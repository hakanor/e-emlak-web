import React from "react";
import "./ads.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Ads = () => {
    return (
        <div className="ads">
          <Sidebar />
          <div className="adsContainer">
          <Navbar />
          ads
          </div>
        </div>
      );
}

export default Ads;