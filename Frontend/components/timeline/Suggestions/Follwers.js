import { Avatar } from "@mui/material";
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Suggestions() {

  const [userId, setUserId] = useState(null);
  const [followingUserId, setFollowingUserId] = useState(null);
  const [array, setArray] = useState([]);

  useEffect(() => {
 
    const fetchData = async () => {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);

      if (storedUserId) {
        try {
          const response = await axios.get(`http://localhost:8080/suggestions/${storedUserId}`);
          if(response.status === 201){
            setArray(response.data.followerData);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchData();
   
  }, [followingUserId]);
  
  const handleFollowing = async (followingId) => {

    try {
      const response = await axios.post('http://localhost:8080/setFollowingUsers', {userId, followingId});
      if(response.status === 201){
        setFollowingUserId(followingId);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  return (
    <div className="mt-8 mr-4">
      <div className="font-bold text-gray-500">Suggestions for you</div>
      <div>
         {array.map((user) => (
         <div key={user.user_id} className="flex items-center justify-between mt-4">
         <div className="flex items-center">
         <span className="avatar">
          <Avatar src={`http://localhost:8080/${user.profile_path}`} />
         </span>
         <span className="ml-2 text-white font-semibold">{user.displayname}</span>
         </div>
         <button className="rounded-xl ml-12 text-blue-500 font-bold bg-transparent border-0 hover:text-white" onClick={ () => handleFollowing(user.user_id)}>
         Follow
         </button>
         </div>
         ))}
      </div>
    </div>
  );
}

export default Suggestions;
