"use client";
import React from "react";
import Sidenav from "@/components/navigation/Sidenav";
import Timeline from "@/components/Search/Timeline";

function Homepage() {

  return (
    <div className="flex bg-black">
      <div className="relative flex-shrink-0 w-1/5">
        <Sidenav />
      </div>
      <div className="flex-grow">
        <Timeline />
      </div>
    </div>
  );
}

export default Homepage;
