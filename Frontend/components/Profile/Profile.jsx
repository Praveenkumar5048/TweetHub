'use client'
import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

function Profilepage() {
  const [userId, setUserId] = useState(null); 
  const [profileData, setProfileData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    console.log(userId);
    if (storedUserId && !isLoading) {
      setIsLoading(true);
      fetchProfileData(storedUserId);
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
      setIsLoading(false); // Always set loading state to false after fetching
    }
  };

  return (
    <div className="mr-5 bg-black">
      {error ? (
        <p>Error: {error}</p> // Display error message if available
      ) : isLoading ? (
        <p>Loading profile...</p> // Display loading indicator while fetching
      ) : (
        <>
          <ProfileHeader userData={profileData} />
          <ProfileTabs userData={profileData} />
        </>
      )}
    </div>
  );
}

export default Profilepage;
