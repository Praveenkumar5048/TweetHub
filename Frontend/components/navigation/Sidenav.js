'use client'
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar } from "@mui/material";
import Loader from "../Loader/loader.js"

function Sidenav() {
  
  const router = useRouter(); 
  
  const [loading, setLoading] = useState(false);
  
  const [userId, setUserId] = useState(null); // Initialize userId state
  const [userDetails, setUserDetails] = useState({
    displayname: '',
    profile_path: ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = localStorage.getItem("tweetuserId");
      setUserId(storedUserId);

      if (storedUserId) {
        try {
          const response = await axios.get(`http://localhost:8080/userDetails/${storedUserId}`);
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchData();
  }, [])
  
  const handleProfileClick = (e) => {
    setLoading(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('tweettoken');
    localStorage.removeItem('tweetuserId');
    router.push("/auth/login");
  }
  if(loading){
    return <Loader />
  }

  return (
    <div className="fixed flex flex-col justify-between z-10">
      <h1 className="text-3xl ml-5 font-mono  text-white my-8">Tweetverse</h1>
      <div className="flex flex-col gap-5">
        <Link href='/home'>
          <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
            <HomeIcon />
            <span className="ml-4 text-xl font-bold">Home</span>
          </button>
        </Link>
        <Link href='/search'>
          <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
            <SearchIcon />
            <span className="ml-4 text-xl font-bold">Search</span>
          </button>
        </Link>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <ExploreIcon />
          <span className="ml-4 text-xl font-bold">Explore</span>
        </button>
        <Link href='/reels'>
          <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
            <SlideshowIcon />
            <span className="ml-4 text-xl font-bold">Reels</span>
          </button>
        </Link>
        <div className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <ChatIcon />
          <span className="ml-4 text-xl font-bold">Messages</span>
        </div>
        <Link href='/createpost'>
          <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
            <AddCircleOutlineIcon />
            <span className="ml-4 text-xl font-bold">Post</span>
          </button>
        </Link>
      </div>
      <Link href={`/profile/${userId}`}>
        <button  className=" flex items-center rounded-lg  py-4 px-4 hover:bg-gray-500" onClick={handleProfileClick}>
          <Avatar src={`http://localhost:8080/${userDetails.profile_path}`} alt='profile' className="mr-2 w-8 h-8" />
          <span className="text-xl text-white">Profile</span>
        </button>
      </Link>
      
      <div className="fixed bottom-3">
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500"
        onClick={handleLogout}>
          <ExitToAppIcon /> 
          <span className="ml-4 text-xl font-bold">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
