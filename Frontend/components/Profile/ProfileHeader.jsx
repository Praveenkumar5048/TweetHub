import React, { useState, useEffect } from 'react';
import EditProfile from "./EditProfile";
import Modal from './ModelList'; 
import { followUser, unfollowUser, checkIfFollowing, getFollowers, getFollowing } from "../../hooks/getFollowers";

const Profile = ({ userData, currentUserId ,updateOfUserDetails}) => {

  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        
        const result = await checkIfFollowing(currentUserId, userData?.user.user_id);
        console.log(result)
        setIsFollowing(result ? "Following" : "Not Following");
       
      } catch (error) {
        console.error('Error checking follow status:', error);
        setIsFollowing(null);
      }
    };

    const fetchFollowersAndFollowing = async () => {
      try {
        const followersData = await getFollowers(userData?.user.user_id);
        const followingData = await getFollowing(userData?.user.user_id);
        setFollowers(followersData);
        setFollowing(followingData);
      } catch (error) {
        console.error('Error fetching followers and following:', error);
      }
    };

    if (userData) {
      setUserId(userData.user.user_id);
      checkFollowingStatus();
      fetchFollowersAndFollowing();
    }
  }, [currentUserId, userData?.user.user_id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openFollowersModal = () => {
    setShowFollowers(true);
  };

  const openFollowingModal = () => {
    setShowFollowing(true);
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing === "Following") {
        const result = await unfollowUser(currentUserId, userData?.user.user_id);
        console.log(result);
      } else {
        const result = await followUser(currentUserId, userData?.user.user_id);
        console.log(result);
      }

      setIsFollowing((prevIsFollowing) => (prevIsFollowing === "Following" ? "Not Following" : "Following"));
      updateOfUserDetails();
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
          currentUserId === userData?.user.user_id ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={openModal}
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                onClick={handleFollowToggle}
              >
                {isFollowing === "Following" ? "Following" : "Follow"}
              </button>
            </div>
          )
        }
      </div>

      <div className="mt-10 flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-500">{userData?.posts[0]?.length}</span>
          <span className="ml-2 text-gray-700">Posts</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold cursor-pointer text-green-500" onClick={openFollowersModal}>
            {userData?.followers[0]?.length}
            <span className="ml-2 text-gray-700">Followers</span>
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold cursor-pointer text-purple-500" onClick={openFollowingModal}>
            {userData?.following[0]?.length}
            <span className="ml-2 text-gray-700">Following</span>
          </span>
        </div>
      </div>


      {isModalOpen &&
        <div className='mt-10'>
          <EditProfile isOpen={isModalOpen} onClose={closeModal} userData={userData} />
        </div>
      }

      {showFollowers && (
        <Modal isOpen={showFollowers} onClose={() => setShowFollowers(false)} listType="Followers" listData={followers} />
      )}

      {showFollowing && (
        <Modal isOpen={showFollowing} onClose={() => setShowFollowing(false)} listType="Following" listData={following} />
      )}
    </div>
  );
};

export default Profile;
