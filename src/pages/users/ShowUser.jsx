import React from "react";
import "./showUser.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const ShowUser = () => {

  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", id));
        setUserData(userDoc.data());
      } catch (err) {
        console.log(err);
        console.log(`No user found with id ${id}`);
      }
    };
    fetchUserData();
  }, [id]);

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
          <List rows ={userData}/>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;