import React from "react";
import "./showAd.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import FirebaseService from '../../FirebaseService';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import List from "../../components/table/Table";
import { basicColumns } from "../../datatablesource";

const ShowAd = () => {
  const { id } = useParams();
  const [adData, setAdData] = useState([]);

  console.log(id);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const collectionName = "ads";
        const result = await FirebaseService.get(collectionName, id);
        
        const transformedData = Object.entries(result).map(([field, value]) => {
          if (field === "uid") {
            value = <a href={`/users/${value}`}>{value}</a>;
          } else if (Array.isArray(value)) {
            value = (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {value.slice(0, 6).map((image, index) => (
                  <a href={image} key={index} style={{ marginRight: "10px" }}>
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      width="150"
                      height="150"
                      style={{ marginBottom: "10px" }}
                    />
                  </a>
                ))}
              </div>
            );
          } else if (typeof value.toString === "function") {
            value = value.toString();
          } else {
            value = "";
          }
        
          return { field, value };
        });
        setAdData(transformedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdData();
  }, []);

  console.log(adData)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Düzenle</div>
            <h1 className="title">İlan Detayları</h1>
            <List data={adData} columns={basicColumns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAd;