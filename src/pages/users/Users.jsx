import React from "react";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./users.css";


const Users = () => {
    return (
        <div className="users">
          <Sidebar />
          <div className="usersContainer">
          <Navbar />
          <Datatable/>
          </div>
        </div>
      );
}

export default Users;