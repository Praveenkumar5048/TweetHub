import { Avatar } from "@mui/material";
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Suggestions() {

  const [userId, setUserId] = useState(null);
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
   
  }, [])
  
  return (
    <div className="mt-8 mr-4">
      <div className="font-bold text-gray-500">Suggestions for you</div>
      <div className="suggestions__usernames">
        {array.map((user) => (
          <div key={user.user_id} className="suggestions__username flex justify-between mt-4">
            <div className="username__left flex">
              <span className="avatar">
                <Avatar src={`http://localhost:8080/${user.profile_path}`}></Avatar>
              </span>
              <div className="username__info flex flex-col ml-2">
                <span className="username font-semibold">{user.displayname}</span>
              </div>
            </div>
            <button className="rounded-xl text-blue-500 font-bold bg-transparent border-0 mr-1 hover:text-white">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
