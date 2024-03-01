import React, { useState, useEffect } from 'react';
import EditProfile from "./EditProfile";
import { followUser, unfollowUser, checkIfFollowing } from "../../hooks/getFollowers"; 

const Profile = ({ userData, currentUserId }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null); // Initially set to null

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
          console.log(userData?.user.user_id,currentUserId)
          const result = await checkIfFollowing(currentUserId, userData?.user.user_id);
          console.log("function is called");
          setIsFollowing(result ? "Following" : "Not Following");
          console.log(result);
      } catch (error) {
        console.error('Error checking follow status:', error);
        setIsFollowing("Not Following");
      }
    };

    checkFollowingStatus();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFollowToggle = async () => {
    console.log(isFollowing)

    if(!isFollowing){
      return ;
    }

    try {
      if (isFollowing == "Following") {
        const result = await unfollowUser(currentUserId, userData?.user.user_id);
        console.log(result)
      } else {
        const result = await followUser(currentUserId, userData?.user.user_id);
        console.log(result)
      }

      setIsFollowing((prevIsFollowing) => (prevIsFollowing == "Following" ? "Not Following" : "Following"));
      
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-black text-white flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={`http://localhost:8080/${userData?.user.profile_path}`}
            alt="Profile Picture"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{userData?.user.displayname}</h2>
            <span className="text-sm">{userData?.user.username}</span>
          </div>
        </div>
        {
          currentUserId == userData?.user.user_id ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={openModal}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleFollowToggle}
            >
              {isFollowing && isFollowing ? "Following" : "Follow"}
            </button>
          )
        }
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
