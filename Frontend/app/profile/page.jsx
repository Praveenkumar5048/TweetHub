import React from "react";
import Sidenav from "@/components/navigation/Sidenav";
import Profile from "@/components/Profile/Profile";

function Profilepage() {
  return (
    <div className="flex bg-black">
      <div className="relative flex-shrink-0">
        <Sidenav />
      </div>
      <div className="flex-grow">
        <Profile/>
      </div>
    </div>
  );
}

export default Profilepage;
