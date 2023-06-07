import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./navbar.css";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = () => {
  const [currentUserId, setCurrentUserId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUserId) {
          const docRef = doc(db, "users", currentUserId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setImageUrl(userData.imageUrl);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [currentUserId]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Türkçe
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">0</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">0</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img src={imageUrl} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
