import React from "react";
import "@/components/Homepage/Homepage.css";
import Sidenav from "@/components/navigation/Sidenav";
import Profile from "@/components/Profile/Profile";

function Profilepage() {
  return (
    <div className="homepage bg-black">
      <div className="homepage__navWraper">
        <Sidenav />
      </div>
      <div className="homepage__timeline">
        <Profile/>
      </div>
    </div>
  );
}

export default Profilepage;
