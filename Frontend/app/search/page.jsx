"use client";
import React from "react";
import Timeline from "@/components/Search/Timeline";

function Homepage() {

  return (
    <div className="flex bg-black">
      <div className="flex-grow">
        <Timeline />
      </div>
    </div>
  );
}

export default Homepage;
