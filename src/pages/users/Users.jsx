import React from "react";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./users.css";

import { useState, useEffect } from "react";
import FirebaseService from '../../FirebaseService';




const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const collectionName = "users";
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
        <div className="users">
          <Sidebar />
          <div className="usersContainer">
          <Navbar />
          <Datatable data={data} dataType={"user"}/>
          </div>
        </div>
      );
}

export default Users;