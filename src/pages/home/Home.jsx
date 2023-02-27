import React from "react";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import List from "../../components/table/Table";
import { useState, useEffect } from "react";
import FirebaseService from '../../FirebaseService';
import { userColumns,adColumns } from "../../datatablesource";

const Home = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const collectionName = "ads";
            const result = await FirebaseService.getAll(collectionName);
            console.log(`Fetched ${result.length} documents`);
            setData(result);
          } catch (error) {
            console.log(error);
          }
        };
    fetchData();
    
  }, []);

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
            <List data={data} columns={adColumns}/>
        </div>
        </div>
      </div>
    );
  };

export default Home;
