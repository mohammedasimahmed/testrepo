import React, { useEffect } from "react";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import { messaging } from "./firebase";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getToken } from "firebase/messaging";

const App = () => {
  async function requestPermission(){
    const permission = await Notification.requestPermission();
    if(permission==='granted'){
      const token = await getToken(messaging,{
        vapidKey:"BFsaZrBJbJ_nKIutcE-aVqd_CI8HT00ZczCf-PPMlPVOe91AYx1Wv0MxYDyvjIvJPpUeBhfmPzmkbhH9G8V64-Y"
      })
      console.log(token)
    }
    else if(permission==='denied'){
      alert("permission denied")
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);
  return (
    <BrowserRouter>
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/users"}>Users</Link>
    </div>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    // <div></div>
  );
};

export default App;
