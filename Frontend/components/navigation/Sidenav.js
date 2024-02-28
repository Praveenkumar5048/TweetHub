'use client'

import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";

function Sidenav() {
  
  const [userId, setUserId] = useState(null); // Initialize userId state
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    profilePath: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);

      // Make an API call to fetch user details
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
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <SearchIcon />
          <span className="ml-4 text-xl font-bold">Search</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <ExploreIcon />
          <span className="ml-4 text-xl font-bold">Explore</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <SlideshowIcon />
          <span className="ml-4 text-xl font-bold">Reels</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <ChatIcon />
          <span className="ml-4 text-xl font-bold">Messages</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <AddCircleOutlineIcon />
          <span className="ml-4 text-xl font-bold">Post</span>
        </button>
      </div>
      <Link href='/profile'>
      <div  className=" flex items-center rounded-lg  py-4 px-4 hover:bg-gray-500" >
        <Avatar src={`http://localhost:8080/${userDetails.profilePath}`} alt='profile' className="mr-2 w-8 h-8" />
        <span className="text-xl text-white">Profile</span>
      </div>
      </Link>
      
      <div className="fixed bottom-3">
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <MenuIcon />
          <span className="ml-4 text-xl font-bold">More</span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
