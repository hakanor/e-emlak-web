import React from "react";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./userReports.css";

import { useState, useEffect } from "react";
import FirebaseService from '../../FirebaseService';

const UserReports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const collectionName = "userReports";
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
        <div className="userReports">
          <Sidebar />
          <div className="userReportsContainer">
          <Navbar />
          <Datatable data={data} dataType={"userReport"}/>
          </div>
        </div>
      );
}

export default UserReports;