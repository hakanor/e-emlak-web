import React, { useState } from "react";
import "./showAd.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import moment from "moment";

import FirebaseService from '../../FirebaseService';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import List from "../../components/table/Table";
import { basicColumns } from "../../datatablesource";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowAd = () => {
  const { id } = useParams();
  const [adData, setAdData] = useState([]);
  const [adStatus, setAdStatus] = useState("");

  console.log(id);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const collectionName = "ads";
        // Fetch data
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
          } else if (field === "date") {
            // Convert Timestamp to desired format
            value = moment(value.toDate()).format("YYYY-MM-DD HH:mm:ss");
          } else if (typeof value.toString === "function") {
            value = value.toString();
          } else {
            value = "";
          }
        
          return { field, value };
        });
        setAdData(transformedData);
        setAdStatus(result.status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdData();
  }, []);

  const handleActivateDeactivate = async () => {
    try {
      const collectionName = "ads";
      const adId = id;
      const updatedStatus = !adStatus;
      const updatedData = { status: updatedStatus };
      
      await FirebaseService.update(collectionName, adId, updatedData);
      setAdStatus(updatedStatus);
      toast.success("İlan durumu başarı ile güncellendi.");
    } catch (error) {
      toast.error("İlan durumu güncellenirken hata! ", error);
    }
  };

  const handleDeleteAd = async () => {
    try {
      const confirmDelete = window.confirm("İlanı kaldırmak istediğinize emin misiniz?");
      if (confirmDelete) {
        const collectionName = "ads";
        await FirebaseService.delete(collectionName, id);
        toast.success("İlan başarı ile silindi.");
      }
    } catch (error) {
      toast.error("İlan silinirken hata! ", error);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        <div className="top">
          <div className="left">
            <div className="buttonGroup2">
              <div className="buttonContainer">
                <button className="button" onClick={handleActivateDeactivate}>
                  {adStatus ? "İlanı Pasif Yap" : "İlanı Aktif Yap"}
                </button>
              </div>
              <div className="buttonContainer">
                <button className="button" onClick={handleDeleteAd}>
                  İlanı Kaldır
                </button>
              </div>
              <div className="buttonContainer">
                <button className="button">İlanı Düzenle</button>
              </div>
            </div>
            <h1 className="title">İlan Detayları</h1>
            <List data={adData} columns={basicColumns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAd;
