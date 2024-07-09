"use client";
import { Avatar } from "@mui/material";
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserSearchBox from "./SearchUser";

function Suggestions() {

  const [followingUserId, setFollowingUserId] = useState(null);
  const [array, setArray] = useState([]);
  const [storedUserId, setStoredUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      const storedUserId = localStorage.getItem("userId");
      setStoredUserId(storedUserId);
      console.log(storedUserId);
    }
  }, []);
  

  useEffect(() => {
 
    const fetchData = async () => {

      if (storedUserId) {
        try {
          const response = await axios.get(`http://localhost:8080/suggestions/${storedUserId}`);
          if(response.status === 201){
            setArray(response.data.followerData);
            console.log(response.data.followerData);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchData();
   
  }, [followingUserId, storedUserId]);
  
  const handleFollowing = async (followingId) => {

    try {
      const response = await axios.post('http://localhost:8080/setFollowingUsers', {storedUserId, followingId});
      if(response.status === 201){
        setFollowingUserId(followingId);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  return (
    <div className="mt-8 mr-4">
      <UserSearchBox/>
      <div className="font-bold text-black">Suggestions for you</div>
      <div>
         {array.map((user) => (
         <div key={user.user_id} className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="avatar">
              <Avatar src={`http://localhost:8080/${user.profile_path}`} />
            </span>
            <span className="ml-2 text-black ">{user.displayname}</span>
          </div>
         <button className="rounded-xl ml-12 text-blue-500  bg-transparent border-0 hover:text-white" onClick={ () => handleFollowing(user.user_id)}>
          Follow
         </button>
         </div>
         ))}
      </div>
    </div>
  );
}

export default Suggestions;
