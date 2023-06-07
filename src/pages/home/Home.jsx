import React from "react";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import List from "../../components/table/Table";
import { useState, useEffect } from "react";
import FirebaseService from '../../FirebaseService';
import { userColumns,adColumns } from "../../datatablesource";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {

  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [adCount, setAdCount] = useState(0);
  const [userReportCount, setUserReportCount] = useState(0);
  const [adReportCount, setAdReportCount] = useState(0);

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
            setData(updatedResult);
          } catch (error) {
            console.log(error);
          }
        };
        
    
    const fetchUserCount = async () => {
      try {
        const collectionName = "users";
        const querySnapshot = await getDocs(collection(db, collectionName));
        setUserCount(querySnapshot.size);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAdCount = async () => {
      try {
        const collectionName = "ads";
        const querySnapshot = await getDocs(collection(db, collectionName));
        setAdCount(querySnapshot.size);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserReportsCount = async () => {
      try {
        const collectionName = "userReports";
        const querySnapshot = await getDocs(collection(db, collectionName));
        setUserReportCount(querySnapshot.size);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAdReportsCount = async () => {
      try {
        const collectionName = "adReports";
        const querySnapshot = await getDocs(collection(db, collectionName));
        setAdReportCount(querySnapshot.size);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchUserCount();
    fetchAdCount();
    fetchUserReportsCount();
    fetchAdReportsCount();

  }, []);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user"  amount={userCount} diff={generateRandomNumber()} />
          <Widget type="userReports"  amount={userReportCount} diff={generateRandomNumber()} />
          <Widget type="ads"  amount={adCount} diff={generateRandomNumber()} />
          <Widget type="adReports"  amount={adReportCount} diff={generateRandomNumber()} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Son İlanlar</div>
            <List data={data} columns={adColumns}/>
        </div>
        </div>
      </div>
    );
  };

export default Home;
