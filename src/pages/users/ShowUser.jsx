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

import {
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase";

const ShowUser = () => {

  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [adsData, setAdsData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", id));
        const userData = userDoc.data();
        setUserData(userData);
        console.log(id);
        if (id != null){
          const adsSnapshot = await getDocs(collection(db, "ads"), where("uid", "==", id));
          const adsData = adsSnapshot.docs.map((doc) => {
            const data = doc.data();
            // Convert object properties to strings
            const stringData = {
              adId : doc.id,
              uid : data.uid,
              title: data.title,
              price: data.price,
              location: data.location,
              images: data.images,
              estateType: data.estateType,
              timestamp: data.timestamp,
              description: data.description,
              floorNumber: data.floorNumber,
              numberOfFloors : data.numberOfFloors,
              numberOfRooms : data.numberOfRooms,
              numberOfBathrooms : data.numberOfBathrooms,
              squareMeter : data.squareMeter,
              squareMeterNet : data.squareMeterNet,
              pricePerSquareMeter : data.pricePerSquareMeter,
              latitude: data.latitude,
              longitude: data.longitude,
              parcelNumber : data.parcelNumber,
              blockNumber : data.blockNumber,
              heating : data.heating,
              ageOfBuilding : data.ageOfBuilding,
              status : data.status
            };
            return stringData;
          });
          setAdsData(adsData);
        }
      } catch (err) {
        console.log(err);
        console.log(`No ads found with id ${id}`);
      }
    };
    fetchUserData();
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
          <List rows={adsData}/>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;