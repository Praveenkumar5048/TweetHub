import React from 'react';
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
  return (
		 <div className='mr-5 bg-black'>
        <ProfileHeader />
        <ProfileTabs />
      </div>
  );
};

export default Profile;
