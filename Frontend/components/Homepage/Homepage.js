import React from "react";
import Sidenav from "../navigation/Sidenav";
import Timeline from "../timeline/Timeline";

function Homepage() {
  return (
    <div className="flex">
      <div className="flex-grow">
        <Timeline />
      </div>
    </div>
  );
}

export default Homepage;
