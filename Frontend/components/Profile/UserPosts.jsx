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
        const response = await axios.get("http://localhost:8080/userposts", {
            user_id: userId,
          });
        const fetchedPosts = response.data;
        setPosts(fetchedPosts);
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
              postImage={post.media_url}
              content={post.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
