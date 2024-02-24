"use client";
import { useState } from 'react';
import { Flex, Box, Button, Text, Image } from "@chakra-ui/react";
import { BsGrid3X3, BsBookmark, BsSuitHeart } from "react-icons/bs";
import TabButton from './TabButton';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-black mt-10 text-white">
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
			{activeTab === "posts" && <RandomPosts />}
			{activeTab === "saved" && <SavedPosts />}
			{activeTab === "likes" && <LikedPosts />}
		</div>
    </div>
  );
};


const Post = ({ content, image }) => (
  <Flex direction="column" alignItems="center" mt={4}>
    <Image src={image} alt="Post Image" borderRadius="lg" mb={2} />
    <Text color="white">{content}</Text>
  </Flex>
);

const RandomPosts = () => {
  // Example array of posts
  const posts = [
    { content: "This is a random post.", image: "/sagarp.png" },
    { content: "Another random post.", image: "/sagarp.png" },
    { content: "Yet another random post.", image: "/sagarp.png" },
  ];

  return (
    <Flex direction="column" alignItems="center" mt={4}>
      {posts.map((post, index) => (
        <Post key={index} content={post.content} image={post.image} />
      ))}
    </Flex>
  );
};

const SavedPosts = () => {
  // Example array of saved posts
  const savedPosts = [
    { content: "This is a saved post.", image: "/sagarp.png" },
    { content: "Another saved post.", image: "/sagarp.png" },
    { content: "Yet another saved post.", image: "/sagarp.png" },
  ];

  return (
    <Flex direction="column" alignItems="center" mt={4}>
      {savedPosts.map((post, index) => (
        <Post key={index} content={post.content} image={post.image} />
      ))}
    </Flex>
  );
};

const LikedPosts = () => {
  // Example array of liked posts
  const likedPosts = [
    { content: "This is a liked post.", image: "/sagarp.png" },
    { content: "Another liked post.", image: "/sagarp.png" },
    { content: "Yet another liked post.", image: "/sagarp.png" },
  ];

  return (
    <Flex direction="column" alignItems="center" mt={4}>
      {likedPosts.map((post, index) => (
        <Post key={index} content={post.content} image={post.image} />
      ))}
    </Flex>
  );
};

export default ProfileTabs;
