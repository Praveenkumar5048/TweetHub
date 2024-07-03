import React from "react";
import Sidenav from "@/components/navigation/Sidenav";
import ReelsPage from "@/components/ReelsPage/ReelsPage";

function ReelPage() {
  return (
    <div className="flex bg-black">
      <div className="flex-grow">
        <ReelsPage/>
      </div>
    </div>
  );
}

export default ReelPage;
