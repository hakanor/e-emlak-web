import React from "react";
import "./showUser.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";

import { useState, useEffect } from "react";
import FirebaseService from '../../FirebaseService';
import { useParams } from "react-router-dom";
import { adColumns } from "../../datatablesource";

const ShowUser = () => {

  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const collectionName = "users";
        const result = await FirebaseService.get(collectionName, id);
        setUserData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();

    const fetchAdData = async () => {
      try {
        const collectionName = "ads";
        const field = "uid";
        const statement = "=="
        const value = id;
        const result = await FirebaseService.getAllWhere(collectionName, field, value);
        console.log(`Fetched ${result.length} ad documents`);
        setAdData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdData();

  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Düzenle</div>
            <h1 className="title">Kullanıcı Bilgisi</h1>
            <div className="item">
              <img
                src={userData.imageUrl}
                alt="No image"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"> {userData.name} {userData.surname} </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue"> {userData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue"> {userData.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {userData.city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">uid:</span>
                  <span className="itemValue"> {userData.uid}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Son İlanları</h1>
          <List data={adData} columns={adColumns} />
        </div>
      </div>
    </div>
  );
};

export default ShowUser;