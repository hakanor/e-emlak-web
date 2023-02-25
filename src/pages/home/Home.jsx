import React from "react";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Home = () => {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
        <Navbar />
        HOME
        </div>
      </div>
    );
  };

export default Home;
