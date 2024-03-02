"use client"
import React, { useState, useEffect } from "react";
import Post from "./Post/Post.js";
import Suggestions from "./Suggestions/Follwers.js";
import Trending from "./Suggestions/Trending";
import axios from 'axios';

function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getposts");
        const fetchedPosts = response.data;
      
        const postsWithUserDetails = await Promise.all(
          fetchedPosts.map(async (post) => {
            const userResponse = await axios.get(`http://localhost:8080/userDetails/${post.user_id}`);
            const user = userResponse.data;
            return { ...post, user }; 
          })
        );

        setPosts(postsWithUserDetails);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mx-auto flex h-screen">
      <div className="flex-1/2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, index) => (
            <Post
              key={index}
              user={post.user} // Send user object instead of user_id
              postImage={post.media_url}
              content={post.content}
              timestamp={post.posted_at}
              postId={post.post_id}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto flex-1/4 overflow-hidden">
        <Suggestions />
        <Trending />
      </div>
    </div>
  );
}

export default Timeline;
