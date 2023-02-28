import React from "react";
import "./userReports.css";
import { useState, useEffect } from "react";
import FirebaseService from '../../FirebaseService';
import Datatable from "../../components/datatable/Datatable";
const UserReports = () => {

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
        <div className="userReports">
            <Datatable data={data} dataType={"user"}/>
        </div>
    )
}

export default UserReports;