'use client'
import React, { useState, useEffect } from "react";
import Post from "../timeline/Post/Post.js";
import Suggestions from "../timeline/Suggestions/Follwers.js";
import Trending from "../timeline/Suggestions/Trending";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import axios from 'axios';

function Profilepage({user_id}) {

  const [userId, setUserId] = useState(null); 
  const [profileData, setProfileData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    setUserId(user_id);
    if (user_id && !isLoading) {
      console.log(user_id);
      setIsLoading(true);
      fetchProfileData(user_id);
    }
  }, []); 

  const fetchProfileData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/profile/${userId}`); // Fetch profile data using the userId
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError(error.message || "An error occurred while fetching profile data."); // Provide user-friendly error message
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="mr-5 bg-black">
      {error ? (
        <p>Error: {error}</p> 
      ) : isLoading ? (
        <p>Loading profile...</p> 
      ) : (
         <div className="mx-auto flex h-screen">
          <div className="flex-1/2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <ProfileHeader userData={profileData}/>
            <ProfileTabs userData={profileData}/>
          </div>
          <div className="mx-auto flex-1/4 overflow-hidden">
            <Suggestions />
            <Trending />
          </div>
        </div>
          )}
        </div>
  );
}

export default Profilepage;
