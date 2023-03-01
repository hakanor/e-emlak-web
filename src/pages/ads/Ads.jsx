import React from "react";
import "./ads.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";

import { useState, useEffect } from "react";
import FirebaseService from '../../FirebaseService';


const Ads = () => {

  const [adData, setAdData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionName = "ads";
        const result = await FirebaseService.getAll(collectionName);
        console.log(`Fetched ${result.length} documents`);
        const updatedResult = result.map((doc) => ({
          documentId: doc.id, // add the uid field to the document
          ...doc,
        }));
        setAdData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

  }, []);
  
  return (
    <div className="ads">
      <Sidebar />
      <div className="adsContainer">
        <Navbar />
        <Datatable data={adData} dataType={"ad"} />
      </div>
    </div>
  );
}

export default Ads;