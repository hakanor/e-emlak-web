import Home from "./pages/home/Home";

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext";

import ShowUser from "./pages/users/ShowUser";
import Users from "./pages/users/Users";
import ShowAd from "./pages/ads/ShowAd";
import Ads from "./pages/ads/Ads";
import Login from "./pages/login/Login";
import UserReport from "./pages/userReports/UserReports";
import AddNewUser from "./pages/addNewUser/AddNewUser";
import AdReports from "./pages/adReports/AdReports";
import EditUser from "./pages/editUser/EditUser";
import EditAd from "./pages/editAd/EditAd";

function App() {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="users">
              <Route index element={<RequireAuth><Users /></RequireAuth>} />
              <Route path=":id" element={<RequireAuth><ShowUser /></RequireAuth>} />
              <Route path="edit/:id" element={<RequireAuth><EditUser /></RequireAuth>} />
            </Route>
            <Route path="ads">
              <Route index element={<RequireAuth><Ads /></RequireAuth>} />
              <Route path=":id" element={<RequireAuth><ShowAd /></RequireAuth>} />
              <Route path="edit/:id" element={<RequireAuth><EditAd /></RequireAuth>} />
            </Route>
            <Route path="users/new" element={<RequireAuth><AddNewUser /></RequireAuth>} />
            <Route path="userReports" element={<RequireAuth><UserReport /></RequireAuth>} />
            <Route path="adReports" element={<RequireAuth><AdReports /></RequireAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
