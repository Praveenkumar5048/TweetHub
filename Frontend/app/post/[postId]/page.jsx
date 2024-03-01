"use client";
import React ,{useState,useEffect} from "react";
import Sidenav from "@/components/navigation/Sidenav";
import Post from "@/components/timeline/Post/Post";

function Profilepage() {
  
    const [postId,setPostId]=useState(null);
    useEffect(() => {
        const getpostId = window.location.pathname.split("/").pop();
        setPostId(getpostId);
      }, []);

  return (
    <div className="flex bg-black">
      <div className="relative flex-shrink-0 w-1/5">
        <Sidenav />
      </div>
      <div className="flex-grow">
      </div>
    </div>
  );
}

export default Profilepage;
