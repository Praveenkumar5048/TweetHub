"use client";
import React, { useState } from 'react';
import EditProfile from "./EditProfile";

const Profile = ({userData}) => {
  console.log(userData?.followers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container w-2/5 mx-auto p-6 bg-black text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src={`http://localhost:8080/${userData?.user.profile_path}`} alt="Profile Picture" className="w-16 h-16 rounded-full mr-4" />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{userData?.user.displayname}</h2>
            <span className="text-sm">{userData?.user.username}</span>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={openModal}>
          Edit Profile
        </button>
      </div>
    
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold">{userData?.posts[0]?.length}</span>
          <span className="ml-2">Post</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold">{userData?.followers[0]?.length}</span>
          <span className="ml-2">Followers</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold">{userData?.following[0]?.length}</span>
          <span className="ml-2">Following</span>
        </div>
      </div>
      
      {isModalOpen && 
      <div className='mt-10'>
        <EditProfile isOpen={isModalOpen} onClose={closeModal} userData={userData} />
      </div>
	  }
    </div>
  );
  
};

export default Profile;
