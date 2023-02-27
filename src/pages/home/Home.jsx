import React from "react";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import List from "../../components/table/Table";

const Home = () => {
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="userReports" />
          <Widget type="ads" />
          <Widget type="adReports" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          {/* 
            <List />
          */}
        </div>
        </div>
      </div>
    );
  };

export default Home;
