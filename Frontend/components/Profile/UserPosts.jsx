"use client"
import React, { useState, useEffect } from "react";
import Post from "../timeline/Post/Post.js";
import axios from 'axios';

function UserPosts({userData}) {
  return (
      <div className="grid grid-cols-1 gap-4">
      {
       userData?.posts[0]?.map((post, index) => (
        <Post
          key={index}
          user={userData.user} 
          postImage={post.media_url}
          content={post.content}
          timestamp={post.posted_at}
        />
      ))}
    </div>
  );
}

export default UserPosts;
