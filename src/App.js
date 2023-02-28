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
            </Route>
            <Route path="ads">
              <Route index element={<RequireAuth><Ads /></RequireAuth>} />
              <Route path=":id" element={<RequireAuth><ShowAd /></RequireAuth>} />
            </Route>
            <Route path="userReports" element={<RequireAuth><UserReport /></RequireAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
