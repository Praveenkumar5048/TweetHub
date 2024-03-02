"use client"
import React, { useState, useEffect } from "react";
import Post from "./Post/Post.js";
import Suggestions from "./Suggestions/Follwers.js";
import Trending from "./Suggestions/Trending";
import axios from 'axios';
import { fetchPosts } from "@/hooks/getPostsDetails.js";

function Timeline() {

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        console.log(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData(); 

  }, []);

  return (
    <div className="mx-auto flex h-screen">
      <div className="flex-1/2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post, index) => (
            <Post
              key={index}
              user={post.user} 
              postImage={post.media_url}
              content={post.content}
              timestamp={post.posted_at}
              likes={post.like_count}
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
