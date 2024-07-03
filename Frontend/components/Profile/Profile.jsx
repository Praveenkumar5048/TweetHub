'use client'
import React, { useState, useEffect } from "react";
import Post from "../timeline/Post/Post.js";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

function Profilepage({user_id}) {

  const [userId, setUserId] = useState(null); 
  const [currentUserId, setCurrentUserId] = useState(null);
  const [profileData, setProfileData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    setUserId(user_id);
    if (user_id && !isLoading) {
      const storedUserId = localStorage.getItem("userId");
      setCurrentUserId(Number(storedUserId ));
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

  const updateOfUserDetails = ()=> {
    fetchProfileData(userId);
  }

  return (
    <div className="mr-5 bg-black">
      {error ? (
        <p>Error: {error}</p> 
      ) : isLoading ? (
        <p>Loading profile...</p> 
      ) : (
         <div className="flex justify-center h-screen">
          <div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            <ProfileHeader 
              userData={profileData}
              currentUserId= {currentUserId}
              updateOfUserDetails= {updateOfUserDetails}
              />
            <ProfileTabs 
              key={profileData?.posts[0].length}
              userData={profileData}
              currentUserId= {currentUserId}
              updateOfUserDetails= {updateOfUserDetails}
              />
          </div>
          
        </div>
          )}
        </div>
  );
}

export default Profilepage;
