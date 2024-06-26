import React, { useContext } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ContentPasteOffOutlinedIcon from '@mui/icons-material/ContentPasteOffOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';

import logo from "../../logo.png";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Your App Logo" className="sideBarLogo" />
          <span className="logo">e-Emlak Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Ana Sayfa</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Ana Sayfa</span>
            </li>
          </Link>
          <p className="title">Panel</p>
          <Link to="/users/new" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddAltIcon className="icon" />
              <span>Yeni Kullanıcı Ekle</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Kullanıcılar</span>
            </li>
          </Link>
          <Link to="/userReports" style={{ textDecoration: "none" }}>
            <li>
              <PersonOffOutlinedIcon className="icon" />
              <span>Kullanıcı Şikayetleri</span>
            </li>
          </Link>
          <Link to="/ads" style={{ textDecoration: "none" }}>
            <li>
              <ContentPasteOutlinedIcon className="icon" />
              <span>İlanlar</span>
            </li>
          </Link>
          <Link to="/adReports" style={{ textDecoration: "none" }}>
            <li>
              <ContentPasteOffOutlinedIcon className="icon" />
              <span>İlan Şikayetleri</span>
            </li>
          </Link>
          <p className="title">Admin Panel</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Çıkış Yap</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
