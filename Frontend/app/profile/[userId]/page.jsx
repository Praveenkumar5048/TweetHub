"use client";
import React ,{useState,useEffect} from "react";
import Sidenav from "@/components/navigation/Sidenav";
import Profile from "@/components/Profile/Profile";

function Profilepage() {
  
    const [userId,setUserId]=useState(null);
    useEffect(() => {
        const getuserId = window.location.pathname.split("/").pop();
        setUserId(getuserId);
        console.log(getuserId)
      }, []);

  return (
    <div className="flex bg-black">
      <div className="flex-grow">
        {userId &&
          <Profile user_id={userId} />
        }
      </div>
    </div>
  );
}

export default Profilepage;
