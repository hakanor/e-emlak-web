import React, { useState, useEffect } from "react";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./adReports.css";

import FirebaseService from '../../FirebaseService';

const AdReports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionName = "adReports";
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
    <div className="adReports">
      <Sidebar />
      <div className="adReportsContainer">
        <Navbar />
        <Datatable data={data} dataType={"adReport"} />
      </div>
    </div>
  );
};

export default AdReports;
