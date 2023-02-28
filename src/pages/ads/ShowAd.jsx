import React from "react";
import "./showAd.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import FirebaseService from '../../FirebaseService';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import List from "../../components/table/Table";
import { adColumns } from "../../datatablesource";

const ShowAd = () => {
  const { id } = useParams();
  const [adData, setAdData] = useState([]);

  console.log(id);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const collectionName = "ads";
        const result = await FirebaseService.get(collectionName, id);
        setAdData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdData();
  }, []);

  console.log(adData)
    return (
        <div className="showAd">
          <Sidebar />
          <div className="showAdContainer">
          <Navbar />
          <div>
            {adData.title}
          </div>
          </div>
        </div>
      );
}

export default ShowAd;