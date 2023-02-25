import React from "react";
import "./ads.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";

const Ads = () => {
    return (
        <div className="ads">
          <Sidebar />
          <div className="adsContainer">
          <Navbar />
          <List/>
          </div>
        </div>
      );
}

export default Ads;