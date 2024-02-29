"use client";
import { useState } from 'react';
import { Flex, Box, Button, Text, Image } from "@chakra-ui/react";
import { BsGrid3X3, BsBookmark, BsSuitHeart } from "react-icons/bs";
import TabButton from './TabButton';
import UserPosts from './UserPosts';

const ProfileTabs = ({ userData ,currentUserId}) => {
  const [activeTab, setActiveTab] = useState("posts");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-10 text-white">
	{
		userData?.user.user_id == currentUserId ? (
			<>
				<Flex justifyContent="center" mt={4} gap={100}>
					<TabButton
						onClick={() => handleTabClick("posts")}
						isActive={activeTab === "posts"}
						icon={<BsGrid3X3 />}
						className={`white ${activeTab === "posts" ? "bg-blue-500 text-white" : ""}`}
						label="Posts"
					/>
					<TabButton
						onClick={() => handleTabClick("saved")}
						isActive={activeTab === "saved"}
						icon={<BsBookmark />}
						className={`white ${activeTab === "saved" ? "bg-green-500 text-white" : ""}`}
						label="Saved"
					/>
					<TabButton
						onClick={() => handleTabClick("likes")}
						isActive={activeTab === "likes"}
						icon={<BsSuitHeart fontWeight="bold" />}
						className={`white ${activeTab === "likes" ? "bg-red-500 text-white" : ""}`}
						label="Likes"
					/>
				</Flex>
				<div className='flex flex-col items-center mt-10'>
					{activeTab === "posts" && <UserPosts userData={userData} />}
					{activeTab === "saved" && <div>savedposts</div>}
					{activeTab === "likes" && <div>likedposts</div>}
				</div>
			</>
		) :(
			<div className='flex flex-col items-center mt-10'>
				<UserPosts userData={userData} />
			</div>
		)
	}
	
    </div>
  );
};

export default ProfileTabs;
