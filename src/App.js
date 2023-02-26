import Home from "./pages/home/Home";

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import ShowUser from "./pages/users/ShowUser";
import Users from "./pages/users/Users";
import ShowAd from "./pages/ads/ShowAd";
import Ads from "./pages/ads/Ads";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path=":userId" element={<ShowUser />} />
            </Route>
            <Route path="ads">
              <Route index element={<Ads />} />
              <Route path=":adId" element={<ShowAd />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
