"use client"
import React, { useState, useEffect } from "react";
import Post from "./Post/Post.js";
import { fetchPosts } from "@/hooks/getPostsDetails.js";
import Loader from '../Loader/loader.js';

function Timeline() {

  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData(); 

  }, []);

  return (
    <div className="flex justify-center h-screen">
      
      {loader ? ( <Loader /> ) :
      (
      <div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="grid grid-cols-1 gap-4">
        {posts.length === 0 ? (
        <div className="p-8 text-white text-xl mt-16">
          <p>No posts to display.</p>
          <div className="mt-4">
            <p>It seems like there are no posts available at the moment.</p>
            <p>Feel free to explore other sections of our website or check back later</p>
          </div>
        </div>
        ) : (
          posts.map((post, index) => (
            <Post
              key={index}
              user={post.user} 
              postImage={post.media_url}
              content={post.content}
              timestamp={post.posted_at}
              postId={post.post_id}
            />
          ))
        )}  
        </div>
      </div>
      )
      }
      
    </div>
  );
}

export default Timeline;
