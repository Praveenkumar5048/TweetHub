import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from "../timeline/Post/Post.js";

function UserPosts({ postsData }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const fetchedPosts = postsData;
        const postsWithUserDetails = await Promise.all(
          fetchedPosts.map(async (post) => {
            const userResponse = await axios.get(`http://localhost:8080/userDetails/${post.user_id}`);
            const user = userResponse.data;
            return { ...post, user };
          })
        );
        setPosts(postsWithUserDetails);
      
      } catch (error) {
       
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post, index) => (
        <Post
          key={index}
          user={post.user}
          postImage={post.media_url}
          content={post.content}
          timestamp={post.posted_at}
          postId={post.post_id}
        />
      ))}
    </div>
  );
}

export default UserPosts;

